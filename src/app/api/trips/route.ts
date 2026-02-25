import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/trips — list all trips for the current user
export async function GET() {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const trips = await prisma.trip.findMany({
        where: { userId: session.user.id },
        orderBy: { updatedAt: "desc" },
        include: {
            _count: {
                select: { stops: true, photos: true, logs: true },
            },
        },
    });

    return NextResponse.json(trips);
}

// POST /api/trips — create a new trip
export async function POST(request: Request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { title, description, inputMode, startDate, endDate } = body;

        if (!title || title.trim().length === 0) {
            return NextResponse.json(
                { error: "Trip title is required" },
                { status: 400 }
            );
        }

        const trip = await prisma.trip.create({
            data: {
                userId: session.user.id,
                title: title.trim(),
                description: description?.trim() || null,
                inputMode: inputMode || "PIN_LOCATIONS",
                startDate: startDate ? new Date(startDate) : null,
                endDate: endDate ? new Date(endDate) : null,
            },
        });

        return NextResponse.json(trip, { status: 201 });
    } catch (error) {
        console.error("Create trip error:", error);
        return NextResponse.json(
            { error: "Failed to create trip" },
            { status: 500 }
        );
    }
}
