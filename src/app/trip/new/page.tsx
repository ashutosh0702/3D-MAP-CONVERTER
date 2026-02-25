"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewTripPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [inputMode, setInputMode] = useState<"PIN_LOCATIONS" | "DRAW_ROUTE">("PIN_LOCATIONS");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            setError("Give your trip a name");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/trips", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    description,
                    inputMode,
                    startDate: startDate || null,
                    endDate: endDate || null,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.error || "Failed to create trip");
                return;
            }

            const trip = await res.json();
            router.push(`/trip/${trip.id}/plan`);
        } catch {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="new-trip-page">
            <div className="new-trip-container">
                <div className="new-trip-card glass-card">
                    <h1 className="heading-lg" style={{ marginBottom: "0.25rem" }}>
                        New Adventure
                    </h1>
                    <p className="text-muted" style={{ marginBottom: "1.5rem" }}>
                        Set up your trip and start planning on the map
                    </p>

                    {error && <div className="auth-error" style={{ marginBottom: "1rem" }}>{error}</div>}

                    <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div className="input-group">
                            <label htmlFor="title">Trip Name *</label>
                            <input
                                id="title"
                                type="text"
                                className="input"
                                placeholder="e.g. Himalayan Trek 2026"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                className="input"
                                placeholder="What's this trip about?"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                style={{ resize: "vertical", fontFamily: "inherit" }}
                            />
                        </div>

                        <div className="input-group">
                            <label>Planning Mode</label>
                            <div className="mode-toggle">
                                <button
                                    type="button"
                                    className={`mode-option ${inputMode === "PIN_LOCATIONS" ? "active" : ""}`}
                                    onClick={() => setInputMode("PIN_LOCATIONS")}
                                >
                                    <span className="mode-icon">📍</span>
                                    <span className="mode-label">Pin Locations</span>
                                    <span className="mode-desc">Click to place stops on the map</span>
                                </button>
                                <button
                                    type="button"
                                    className={`mode-option ${inputMode === "DRAW_ROUTE" ? "active" : ""}`}
                                    onClick={() => setInputMode("DRAW_ROUTE")}
                                >
                                    <span className="mode-icon">✏️</span>
                                    <span className="mode-label">Draw Route</span>
                                    <span className="mode-desc">Draw your path on the map</span>
                                </button>
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                            <div className="input-group">
                                <label htmlFor="startDate">Start Date</label>
                                <input
                                    id="startDate"
                                    type="date"
                                    className="input"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="endDate">End Date</label>
                                <input
                                    id="endDate"
                                    type="date"
                                    className="input"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            disabled={loading}
                            style={{ marginTop: "0.5rem" }}
                        >
                            {loading ? "Creating..." : "Create Trip & Open Map"}
                        </button>
                    </form>

                    <button
                        className="btn btn-ghost"
                        onClick={() => router.push("/dashboard")}
                        style={{ marginTop: "0.5rem", width: "100%" }}
                    >
                        ← Back to Dashboard
                    </button>
                </div>
            </div>

            <style>{`
        .new-trip-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--gradient-hero);
          padding: var(--space-lg);
        }

        .new-trip-container {
          width: 100%;
          max-width: 520px;
          animation: fadeInUp 0.5s ease-out;
        }

        .new-trip-card {
          padding: var(--space-2xl);
        }

        .auth-error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: var(--radius-md);
          padding: var(--space-sm) var(--space-md);
          color: #fca5a5;
          font-size: 0.85rem;
          text-align: center;
        }

        .mode-toggle {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-sm);
        }

        .mode-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
          padding: var(--space-md);
          background: var(--bg-secondary);
          border: 2px solid var(--border-subtle);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
          font-family: inherit;
          color: var(--text-primary);
        }

        .mode-option:hover {
          border-color: var(--border-medium);
        }

        .mode-option.active {
          border-color: var(--accent-primary);
          background: rgba(6, 182, 212, 0.05);
          box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
        }

        .mode-icon {
          font-size: 1.5rem;
        }

        .mode-label {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .mode-desc {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-align: center;
        }

        textarea.input {
          min-height: 80px;
        }

        input[type="date"].input {
          color-scheme: dark;
        }
      `}</style>
        </div>
    );
}
