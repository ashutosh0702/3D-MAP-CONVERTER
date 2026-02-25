import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// DELETE /api/trips/[tripId]/stops/[stopId] — delete a stop
export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ tripId: string; stopId: string }> }
) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { tripId, stopId } = await params;

    // Verify trip ownership
    const trip = await prisma.trip.findFirst({
        where: { id: tripId, userId: session.user.id },
    });

    if (!trip) {
        return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    const stop = await prisma.stop.findFirst({
        where: { id: stopId, tripId },
    });

    if (!stop) {
        return NextResponse.json({ error: "Stop not found" }, { status: 404 });
    }

    await prisma.stop.delete({ where: { id: stopId } });

    // Reorder remaining stops
    const remainingStops = await prisma.stop.findMany({
        where: { tripId },
        orderBy: { order: "asc" },
    });

    if (remainingStops.length > 0) {
        await prisma.$transaction(
            remainingStops.map((s, index) =>
                prisma.stop.update({
                    where: { id: s.id },
                    data: { order: index },
                })
            )
        );
    }

    return NextResponse.json({ message: "Stop deleted" });
}

// PATCH /api/trips/[tripId]/stops/[stopId] — update a single stop
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ tripId: string; stopId: string }> }
) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { tripId, stopId } = await params;

    const trip = await prisma.trip.findFirst({
        where: { id: tripId, userId: session.user.id },
    });

    if (!trip) {
        return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    try {
        const body = await request.json();
        const { name, lat, lng, order, notes, arrivalDate } = body;

        const stop = await prisma.stop.update({
            where: { id: stopId },
            data: {
                ...(name !== undefined && { name: name.trim() }),
                ...(lat !== undefined && { lat }),
                ...(lng !== undefined && { lng }),
                ...(order !== undefined && { order }),
                ...(notes !== undefined && { notes: notes?.trim() || null }),
                ...(arrivalDate !== undefined && {
                    arrivalDate: arrivalDate ? new Date(arrivalDate) : null,
                }),
            },
        });

        return NextResponse.json(stop);
    } catch (error) {
        console.error("Update stop error:", error);
        return NextResponse.json(
            { error: "Failed to update stop" },
            { status: 500 }
        );
    }
}
