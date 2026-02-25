import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
    const session = await auth();
    if (!session) redirect("/login");

    const trips = await prisma.trip.findMany({
        where: { userId: session.user.id },
        orderBy: { updatedAt: "desc" },
        include: {
            _count: {
                select: { stops: true, photos: true, logs: true },
            },
        },
    });

    const statusBadgeClass: Record<string, string> = {
        PLANNING: "badge-planning",
        ACTIVE: "badge-active",
        COMPLETED: "badge-completed",
    };

    return (
        <div className="dashboard">
            <nav className="dashboard-nav">
                <div className="dashboard-nav-inner">
                    <Link href="/dashboard" className="dashboard-brand">TripDiorama</Link>
                    <div className="dashboard-nav-right">
                        <span className="dashboard-user">{session.user.name || session.user.email}</span>
                        <form action={async () => {
                            "use server";
                            const { signOut } = await import("@/lib/auth");
                            await signOut({ redirectTo: "/" });
                        }}>
                            <button type="submit" className="btn btn-ghost btn-sm">Sign Out</button>
                        </form>
                    </div>
                </div>
            </nav>

            <main className="page-container dashboard-main">
                <div className="dashboard-header">
                    <div>
                        <h1 className="heading-lg">Your Trips</h1>
                        <p className="text-muted">Plan, explore, and remember your adventures</p>
                    </div>
                    <Link href="/trip/new" className="btn btn-primary">
                        + New Trip
                    </Link>
                </div>

                {trips.length === 0 ? (
                    <div className="dashboard-empty glass-card">
                        <div className="empty-icon">🌍</div>
                        <h3>No trips yet</h3>
                        <p className="text-muted">
                            Start planning your first adventure and turn it into a beautiful 3D diorama.
                        </p>
                        <Link href="/trip/new" className="btn btn-primary">
                            Create Your First Trip
                        </Link>
                    </div>
                ) : (
                    <div className="trips-grid">
                        {trips.map((trip) => (
                            <Link
                                key={trip.id}
                                href={`/trip/${trip.id}/plan`}
                                className="trip-card glass-card"
                            >
                                <div className="trip-card-header">
                                    <h3 className="heading-sm">{trip.title}</h3>
                                    <span className={`badge ${statusBadgeClass[trip.status]}`}>
                                        {trip.status.toLowerCase()}
                                    </span>
                                </div>
                                {trip.description && (
                                    <p className="trip-card-desc text-muted">{trip.description}</p>
                                )}
                                <div className="trip-card-meta">
                                    <span>📍 {trip._count.stops} stops</span>
                                    <span>📸 {trip._count.photos} photos</span>
                                    <span>📝 {trip._count.logs} entries</span>
                                </div>
                                <div className="trip-card-dates text-muted">
                                    {trip.startDate
                                        ? new Date(trip.startDate).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                        : "No dates set"}
                                    {trip.endDate &&
                                        ` — ${new Date(trip.endDate).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}`}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>

            <style>{`
        .dashboard {
          min-height: 100vh;
          background: var(--bg-primary);
        }

        .dashboard-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          padding: var(--space-md) var(--space-lg);
          background: rgba(10, 14, 26, 0.8);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-subtle);
        }

        .dashboard-nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .dashboard-brand {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 800;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .dashboard-nav-right {
          display: flex;
          align-items: center;
          gap: var(--space-md);
        }

        .dashboard-user {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .dashboard-main {
          padding-top: var(--space-2xl);
        }

        .dashboard-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: var(--space-xl);
          animation: fadeInUp 0.4s ease-out;
        }

        .dashboard-empty {
          text-align: center;
          padding: var(--space-3xl);
          animation: fadeInUp 0.5s ease-out;
        }

        .empty-icon {
          font-size: 3rem;
          margin-bottom: var(--space-md);
        }

        .dashboard-empty h3 {
          font-family: var(--font-display);
          font-size: 1.25rem;
          margin-bottom: var(--space-sm);
        }

        .dashboard-empty p {
          margin-bottom: var(--space-lg);
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }

        .trips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: var(--space-lg);
        }

        .trip-card {
          padding: var(--space-lg);
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
          animation: fadeInUp 0.5s ease-out;
          text-decoration: none;
          color: inherit;
        }

        .trip-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-sm);
        }

        .trip-card-desc {
          font-size: 0.85rem;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .trip-card-meta {
          display: flex;
          gap: var(--space-md);
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .trip-card-dates {
          font-size: 0.75rem;
          margin-top: auto;
          padding-top: var(--space-sm);
          border-top: 1px solid var(--border-subtle);
        }

        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            gap: var(--space-md);
          }

          .trips-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
}
