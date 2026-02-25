"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface Stop {
    id: string;
    name: string;
    lat: number;
    lng: number;
    order: number;
    arrivalDate: string | null;
    notes: string | null;
}

interface Trip {
    id: string;
    title: string;
    description: string | null;
    status: string;
    inputMode: "PIN_LOCATIONS" | "DRAW_ROUTE";
    startDate: string | null;
    endDate: string | null;
    routeGeoJSON: unknown;
    stops: Stop[];
}

export default function TripPlanPage() {
    const { tripId } = useParams<{ tripId: string }>();
    const router = useRouter();
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const markersRef = useRef<mapboxgl.Marker[]>([]);

    const [trip, setTrip] = useState<Trip | null>(null);
    const [stops, setStops] = useState<Stop[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [mapStyle, setMapStyle] = useState<"satellite" | "streets" | "terrain">("streets");
    const [editingStop, setEditingStop] = useState<string | null>(null);
    const [newStopName, setNewStopName] = useState("");
    const [newStopNotes, setNewStopNotes] = useState("");
    const [newStopDate, setNewStopDate] = useState("");
    const [pendingPin, setPendingPin] = useState<{ lat: number; lng: number } | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Fetch trip data
    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const res = await fetch(`/api/trips/${tripId}`);
                if (!res.ok) {
                    router.push("/dashboard");
                    return;
                }
                const data = await res.json();
                setTrip(data);
                setStops(data.stops || []);
            } catch {
                router.push("/dashboard");
            } finally {
                setLoading(false);
            }
        };
        fetchTrip();
    }, [tripId, router]);

    // Map style URLs
    const styleUrls: Record<string, string> = {
        streets: "mapbox://styles/mapbox/dark-v11",
        satellite: "mapbox://styles/mapbox/satellite-streets-v12",
        terrain: "mapbox://styles/mapbox/outdoors-v12",
    };

    // Initialize map
    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
        if (!token || token === "YOUR_MAPBOX_ACCESS_TOKEN_HERE") {
            console.warn("Mapbox token not set");
            return;
        }

        mapboxgl.accessToken = token;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: styleUrls[mapStyle],
            center: [78.9629, 20.5937], // Center on India as default
            zoom: 4,
            pitch: 0,
            bearing: 0,
        });

        map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
        map.current.addControl(new mapboxgl.ScaleControl(), "bottom-right");

        return () => {
            map.current?.remove();
            map.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update map style
    useEffect(() => {
        if (map.current) {
            map.current.setStyle(styleUrls[mapStyle]);
            // Re-add route source/layer after style change
            map.current.once("style.load", () => {
                renderRoute();
                renderMarkers();
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapStyle]);

    // Handle map click for Pin mode
    useEffect(() => {
        if (!map.current || !trip) return;

        const handleClick = (e: mapboxgl.MapMouseEvent) => {
            if (trip.inputMode !== "PIN_LOCATIONS") return;
            setPendingPin({ lat: e.lngLat.lat, lng: e.lngLat.lng });
            setNewStopName("");
            setNewStopNotes("");
            setNewStopDate("");
        };

        map.current.on("click", handleClick);
        return () => {
            map.current?.off("click", handleClick);
        };
    }, [trip]);

    // Render markers for stops
    const renderMarkers = useCallback(() => {
        // Clear existing markers
        markersRef.current.forEach((m) => m.remove());
        markersRef.current = [];

        if (!map.current) return;

        stops.forEach((stop, index) => {
            const el = document.createElement("div");
            el.className = "custom-marker";
            el.innerHTML = `<div class="marker-dot">${index + 1}</div>`;
            el.style.cssText = `
        width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
        cursor: pointer;
      `;
            const dotStyle = `
        width: 28px; height: 28px; border-radius: 50%;
        background: linear-gradient(135deg, #06b6d4, #8b5cf6);
        color: white; font-weight: 700; font-size: 0.75rem;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 0 12px rgba(6, 182, 212, 0.4);
        border: 2px solid rgba(255, 255, 255, 0.3);
        transition: transform 150ms ease;
      `;
            el.querySelector(".marker-dot")!.setAttribute("style", dotStyle);

            el.addEventListener("mouseenter", () => {
                const dot = el.querySelector(".marker-dot") as HTMLElement;
                if (dot) dot.style.transform = "scale(1.2)";
            });
            el.addEventListener("mouseleave", () => {
                const dot = el.querySelector(".marker-dot") as HTMLElement;
                if (dot) dot.style.transform = "scale(1)";
            });

            const marker = new mapboxgl.Marker({ element: el, draggable: true })
                .setLngLat([stop.lng, stop.lat])
                .addTo(map.current!);

            marker.on("dragend", async () => {
                const lngLat = marker.getLngLat();
                const updatedStops = stops.map((s) =>
                    s.id === stop.id ? { ...s, lat: lngLat.lat, lng: lngLat.lng } : s
                );
                setStops(updatedStops);
                // Save position
                await fetch(`/api/trips/${tripId}/stops`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        stops: [{ id: stop.id, lat: lngLat.lat, lng: lngLat.lng }],
                    }),
                });
            });

            markersRef.current.push(marker);
        });

        // Render route line between stops
        renderRoute();
    }, [stops, tripId]);

    // Render route line
    const renderRoute = useCallback(() => {
        if (!map.current || stops.length < 2) return;

        // Remove existing route layer/source
        if (map.current.getLayer("route-line")) {
            map.current.removeLayer("route-line");
        }
        if (map.current.getSource("route")) {
            map.current.removeSource("route");
        }

        const coordinates = stops.map((s) => [s.lng, s.lat]);

        map.current.addSource("route", {
            type: "geojson",
            data: {
                type: "Feature",
                properties: {},
                geometry: {
                    type: "LineString",
                    coordinates,
                },
            },
        });

        map.current.addLayer({
            id: "route-line",
            type: "line",
            source: "route",
            layout: {
                "line-join": "round",
                "line-cap": "round",
            },
            paint: {
                "line-color": "#06b6d4",
                "line-width": 3,
                "line-opacity": 0.7,
                "line-dasharray": [2, 2],
            },
        });
    }, [stops]);

    // Update markers when stops change
    useEffect(() => {
        if (map.current && map.current.isStyleLoaded()) {
            renderMarkers();
        } else if (map.current) {
            map.current.once("style.load", renderMarkers);
        }
    }, [stops, renderMarkers]);

    // Add a new stop
    const handleAddStop = async () => {
        if (!pendingPin || !newStopName.trim()) return;

        setSaving(true);
        try {
            const res = await fetch(`/api/trips/${tripId}/stops`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: newStopName,
                    lat: pendingPin.lat,
                    lng: pendingPin.lng,
                    notes: newStopNotes || null,
                    arrivalDate: newStopDate || null,
                }),
            });

            if (res.ok) {
                const stop = await res.json();
                setStops((prev) => [...prev, stop]);
                setPendingPin(null);
            }
        } catch (e) {
            console.error("Failed to add stop:", e);
        } finally {
            setSaving(false);
        }
    };

    // Delete a stop
    const handleDeleteStop = async (stopId: string) => {
        try {
            // Delete from the batch update by removing from local state
            const updatedStops = stops.filter((s) => s.id !== stopId);
            setStops(updatedStops);

            // Reorder remaining stops
            const reordered = updatedStops.map((s, i) => ({
                id: s.id,
                order: i,
            }));

            await fetch(`/api/trips/${tripId}/stops`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ stops: reordered }),
            });

            // Actually delete from DB - we'll use a direct approach
            await fetch(`/api/trips/${tripId}/stops/${stopId}`, {
                method: "DELETE",
            });
        } catch (e) {
            console.error("Failed to delete stop:", e);
        }
    };

    // Fit map to stops
    const fitToStops = () => {
        if (!map.current || stops.length === 0) return;

        if (stops.length === 1) {
            map.current.flyTo({
                center: [stops[0].lng, stops[0].lat],
                zoom: 12,
                duration: 1000,
            });
            return;
        }

        const bounds = new mapboxgl.LngLatBounds();
        stops.forEach((s) => bounds.extend([s.lng, s.lat]));
        map.current.fitBounds(bounds, { padding: 80, duration: 1000 });
    };

    // Save route GeoJSON
    const handleSaveRoute = async () => {
        if (stops.length < 2) return;

        setSaving(true);
        try {
            const coordinates = stops.map((s) => [s.lng, s.lat]);
            const bounds = stops.reduce(
                (acc, s) => ({
                    minLat: Math.min(acc.minLat, s.lat),
                    maxLat: Math.max(acc.maxLat, s.lat),
                    minLng: Math.min(acc.minLng, s.lng),
                    maxLng: Math.max(acc.maxLng, s.lng),
                }),
                { minLat: 90, maxLat: -90, minLng: 180, maxLng: -180 }
            );

            await fetch(`/api/trips/${tripId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    routeGeoJSON: {
                        type: "Feature",
                        properties: {},
                        geometry: { type: "LineString", coordinates },
                    },
                    bboxMinLat: bounds.minLat,
                    bboxMaxLat: bounds.maxLat,
                    bboxMinLng: bounds.minLng,
                    bboxMaxLng: bounds.maxLng,
                }),
            });
        } catch (e) {
            console.error("Failed to save route:", e);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="plan-loading">
                <div className="skeleton" style={{ width: "100%", height: "100vh" }}></div>
            </div>
        );
    }

    if (!trip) return null;

    return (
        <div className="plan-page">
            {/* Top bar */}
            <div className="plan-topbar">
                <div className="plan-topbar-left">
                    <button className="btn btn-ghost btn-sm" onClick={() => router.push("/dashboard")}>
                        ← Back
                    </button>
                    <h2 className="heading-sm">{trip.title}</h2>
                    <span className={`badge badge-${trip.status.toLowerCase()}`}>
                        {trip.status.toLowerCase()}
                    </span>
                </div>
                <div className="plan-topbar-right">
                    <div className="style-toggle">
                        {(["streets", "satellite", "terrain"] as const).map((s) => (
                            <button
                                key={s}
                                className={`style-btn ${mapStyle === s ? "active" : ""}`}
                                onClick={() => setMapStyle(s)}
                            >
                                {s === "streets" ? "🗺️" : s === "satellite" ? "🛰️" : "⛰️"}
                            </button>
                        ))}
                    </div>
                    <button className="btn btn-ghost btn-sm" onClick={fitToStops}>
                        📐 Fit View
                    </button>
                    <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {sidebarOpen ? "◀" : "▶"} Itinerary
                    </button>
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={handleSaveRoute}
                        disabled={saving || stops.length < 2}
                    >
                        {saving ? "Saving..." : "💾 Save Route"}
                    </button>
                </div>
            </div>

            <div className="plan-content">
                {/* Map */}
                <div className="plan-map-wrap">
                    <div ref={mapContainer} className="plan-map" />

                    {/* Mode indicator */}
                    <div className="mode-indicator">
                        {trip.inputMode === "PIN_LOCATIONS"
                            ? "📍 Click map to add stops"
                            : "✏️ Draw route mode"}
                    </div>

                    {/* Pending pin form */}
                    {pendingPin && (
                        <div className="pin-form glass-card">
                            <h4 className="heading-sm">Add Stop</h4>
                            <p className="text-muted" style={{ fontSize: "0.75rem", marginBottom: "0.5rem" }}>
                                {pendingPin.lat.toFixed(4)}, {pendingPin.lng.toFixed(4)}
                            </p>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Stop name"
                                    value={newStopName}
                                    onChange={(e) => setNewStopName(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Notes (optional)"
                                    value={newStopNotes}
                                    onChange={(e) => setNewStopNotes(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="date"
                                    className="input"
                                    value={newStopDate}
                                    onChange={(e) => setNewStopDate(e.target.value)}
                                />
                            </div>
                            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={handleAddStop}
                                    disabled={!newStopName.trim() || saving}
                                    style={{ flex: 1 }}
                                >
                                    {saving ? "Adding..." : "Add"}
                                </button>
                                <button
                                    className="btn btn-ghost btn-sm"
                                    onClick={() => setPendingPin(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                {sidebarOpen && (
                    <div className="plan-sidebar">
                        <div className="sidebar-header">
                            <h3 className="heading-sm">Itinerary</h3>
                            <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                                {stops.length} stop{stops.length !== 1 ? "s" : ""}
                            </span>
                        </div>

                        {stops.length === 0 ? (
                            <div className="sidebar-empty">
                                <p className="text-muted">
                                    Click on the map to add your first stop
                                </p>
                            </div>
                        ) : (
                            <div className="stops-list">
                                {stops.map((stop, index) => (
                                    <div
                                        key={stop.id}
                                        className={`stop-item ${editingStop === stop.id ? "editing" : ""}`}
                                        onClick={() => {
                                            if (map.current) {
                                                map.current.flyTo({
                                                    center: [stop.lng, stop.lat],
                                                    zoom: 14,
                                                    duration: 800,
                                                });
                                            }
                                        }}
                                    >
                                        <div className="stop-number">{index + 1}</div>
                                        <div className="stop-info">
                                            <div className="stop-name">{stop.name}</div>
                                            {stop.notes && (
                                                <div className="stop-notes text-muted">{stop.notes}</div>
                                            )}
                                            {stop.arrivalDate && (
                                                <div className="stop-date text-muted">
                                                    📅 {new Date(stop.arrivalDate).toLocaleDateString()}
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            className="stop-delete btn btn-ghost btn-icon btn-sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteStop(stop.id);
                                            }}
                                            title="Remove stop"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="sidebar-footer">
                            <div className="divider" />
                            <p className="text-muted" style={{ fontSize: "0.75rem", textAlign: "center" }}>
                                Drag markers to reposition • Click stops to zoom
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        .plan-page {
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--bg-primary);
          overflow: hidden;
        }

        .plan-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 1rem;
          background: rgba(10, 14, 26, 0.9);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-subtle);
          z-index: 10;
          flex-shrink: 0;
        }

        .plan-topbar-left,
        .plan-topbar-right {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .style-toggle {
          display: flex;
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
          overflow: hidden;
        }

        .style-btn {
          padding: 0.35rem 0.6rem;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          transition: background var(--transition-fast);
        }

        .style-btn:hover {
          background: var(--bg-elevated);
        }

        .style-btn.active {
          background: var(--bg-elevated);
          box-shadow: inset 0 0 0 1px var(--border-accent);
        }

        .plan-content {
          flex: 1;
          display: flex;
          overflow: hidden;
        }

        .plan-map-wrap {
          flex: 1;
          position: relative;
        }

        .plan-map {
          width: 100%;
          height: 100%;
        }

        .mode-indicator {
          position: absolute;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          padding: 0.5rem 1.25rem;
          background: rgba(10, 14, 26, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          color: var(--text-secondary);
          white-space: nowrap;
          pointer-events: none;
        }

        .pin-form {
          position: absolute;
          bottom: 4rem;
          left: 50%;
          transform: translateX(-50%);
          padding: 1rem;
          width: 280px;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          z-index: 5;
          animation: fadeInUp 0.25s ease-out;
        }

        .pin-form input[type="date"] {
          color-scheme: dark;
        }

        .plan-sidebar {
          width: 320px;
          background: var(--bg-secondary);
          border-left: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          flex-shrink: 0;
          animation: slideInRight 0.3s ease-out;
        }

        .sidebar-header {
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
          flex-shrink: 0;
        }

        .sidebar-empty {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          text-align: center;
        }

        .stops-list {
          flex: 1;
          overflow-y: auto;
          padding: 0.5rem;
        }

        .stop-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.75rem;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: background var(--transition-fast);
          position: relative;
        }

        .stop-item:hover {
          background: var(--bg-elevated);
        }

        .stop-number {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--gradient-primary);
          color: white;
          font-size: 0.7rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .stop-info {
          flex: 1;
          min-width: 0;
        }

        .stop-name {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .stop-notes {
          font-size: 0.75rem;
          margin-top: 0.2rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .stop-date {
          font-size: 0.7rem;
          margin-top: 0.2rem;
        }

        .stop-delete {
          opacity: 0;
          transition: opacity var(--transition-fast);
          font-size: 0.75rem;
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .stop-item:hover .stop-delete {
          opacity: 1;
        }

        .sidebar-footer {
          padding: 0 1rem 1rem;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .plan-sidebar {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 20;
            box-shadow: var(--shadow-lg);
          }

          .plan-topbar {
            flex-wrap: wrap;
            gap: 0.5rem;
          }
        }
      `}</style>
        </div>
    );
}
