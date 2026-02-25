import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/trips/[tripId] — get a single trip
export async function GET(
    _request: Request,
    { params }: { params: Promise<{ tripId: string }> }
) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { tripId } = await params;

    const trip = await prisma.trip.findFirst({
        where: { id: tripId, userId: session.user.id },
        include: {
            stops: { orderBy: { order: "asc" } },
            photos: true,
            logs: { orderBy: { timestamp: "desc" } },
            diorama: true,
        },
    });

    if (!trip) {
        return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    return NextResponse.json(trip);
}

// PATCH /api/trips/[tripId] — update a trip
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ tripId: string }> }
) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { tripId } = await params;

    // Verify ownership
    const existing = await prisma.trip.findFirst({
        where: { id: tripId, userId: session.user.id },
    });

    if (!existing) {
        return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    try {
        const body = await request.json();
        const {
            title,
            description,
            status,
            inputMode,
            startDate,
            endDate,
            routeGeoJSON,
            bboxMinLat,
            bboxMinLng,
            bboxMaxLat,
            bboxMaxLng,
        } = body;

        const trip = await prisma.trip.update({
            where: { id: tripId },
            data: {
                ...(title !== undefined && { title: title.trim() }),
                ...(description !== undefined && {
                    description: description?.trim() || null,
                }),
                ...(status !== undefined && { status }),
                ...(inputMode !== undefined && { inputMode }),
                ...(startDate !== undefined && {
                    startDate: startDate ? new Date(startDate) : null,
                }),
                ...(endDate !== undefined && {
                    endDate: endDate ? new Date(endDate) : null,
                }),
                ...(routeGeoJSON !== undefined && { routeGeoJSON }),
                ...(bboxMinLat !== undefined && { bboxMinLat }),
                ...(bboxMinLng !== undefined && { bboxMinLng }),
                ...(bboxMaxLat !== undefined && { bboxMaxLat }),
                ...(bboxMaxLng !== undefined && { bboxMaxLng }),
            },
        });

        return NextResponse.json(trip);
    } catch (error) {
        console.error("Update trip error:", error);
        return NextResponse.json(
            { error: "Failed to update trip" },
            { status: 500 }
        );
    }
}

// DELETE /api/trips/[tripId] — delete a trip
export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ tripId: string }> }
) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { tripId } = await params;

    const existing = await prisma.trip.findFirst({
        where: { id: tripId, userId: session.user.id },
    });

    if (!existing) {
        return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    await prisma.trip.delete({ where: { id: tripId } });

    return NextResponse.json({ message: "Trip deleted" });
}
