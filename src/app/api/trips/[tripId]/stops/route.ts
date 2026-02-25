import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/trips/[tripId]/stops — list stops for a trip
export async function GET(
    _request: Request,
    { params }: { params: Promise<{ tripId: string }> }
) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { tripId } = await params;

    // Verify trip ownership
    const trip = await prisma.trip.findFirst({
        where: { id: tripId, userId: session.user.id },
    });

    if (!trip) {
        return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    const stops = await prisma.stop.findMany({
        where: { tripId },
        orderBy: { order: "asc" },
    });

    return NextResponse.json(stops);
}

// POST /api/trips/[tripId]/stops — add a stop
export async function POST(
    request: Request,
    { params }: { params: Promise<{ tripId: string }> }
) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { tripId } = await params;

    // Verify trip ownership
    const trip = await prisma.trip.findFirst({
        where: { id: tripId, userId: session.user.id },
    });

    if (!trip) {
        return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    try {
        const body = await request.json();
        const { name, lat, lng, arrivalDate, notes } = body;

        if (!name || lat === undefined || lng === undefined) {
            return NextResponse.json(
                { error: "Name, lat, and lng are required" },
                { status: 400 }
            );
        }

        // Get the next order value
        const maxOrder = await prisma.stop.aggregate({
            where: { tripId },
            _max: { order: true },
        });
        const nextOrder = (maxOrder._max.order ?? -1) + 1;

        const stop = await prisma.stop.create({
            data: {
                tripId,
                name: name.trim(),
                lat: parseFloat(lat),
                lng: parseFloat(lng),
                order: nextOrder,
                arrivalDate: arrivalDate ? new Date(arrivalDate) : null,
                notes: notes?.trim() || null,
            },
        });

        return NextResponse.json(stop, { status: 201 });
    } catch (error) {
        console.error("Create stop error:", error);
        return NextResponse.json(
            { error: "Failed to create stop" },
            { status: 500 }
        );
    }
}

// PATCH /api/trips/[tripId]/stops — reorder stops (bulk update)
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ tripId: string }> }
) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { tripId } = await params;

    const trip = await prisma.trip.findFirst({
        where: { id: tripId, userId: session.user.id },
    });

    if (!trip) {
        return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    try {
        const body = await request.json();
        const { stops } = body; // Array of { id, order, name?, lat?, lng?, notes?, arrivalDate? }

        if (!Array.isArray(stops)) {
            return NextResponse.json(
                { error: "stops array is required" },
                { status: 400 }
            );
        }

        // Update each stop
        await prisma.$transaction(
            stops.map((s: { id: string; order?: number; name?: string; lat?: number; lng?: number; notes?: string; arrivalDate?: string }) =>
                prisma.stop.update({
                    where: { id: s.id },
                    data: {
                        ...(s.order !== undefined && { order: s.order }),
                        ...(s.name !== undefined && { name: s.name.trim() }),
                        ...(s.lat !== undefined && { lat: s.lat }),
                        ...(s.lng !== undefined && { lng: s.lng }),
                        ...(s.notes !== undefined && { notes: s.notes?.trim() || null }),
                        ...(s.arrivalDate !== undefined && {
                            arrivalDate: s.arrivalDate ? new Date(s.arrivalDate) : null,
                        }),
                    },
                })
            )
        );

        const updated = await prisma.stop.findMany({
            where: { tripId },
            orderBy: { order: "asc" },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Update stops error:", error);
        return NextResponse.json(
            { error: "Failed to update stops" },
            { status: 500 }
        );
    }
}

// DELETE handler is on individual stop endpoint
