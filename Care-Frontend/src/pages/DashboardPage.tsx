import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import VitalIndicator from "../components/VitalIndicator";
import VitalsHistory from "../components/VitalsHistory";
import AddVitalModal from "../components/AddVitalModal";
import Footer from "../components/Footer";
import { getParentById } from "../services/parentService";
import { getVitals, createVital } from "../services/vitalService";
import type { Parent, Vital } from "../types";

/** Vital threshold checks (°F for temperature) */
function isNormal(key: "heartRate" | "spo2" | "bodyTemperature", val: number) {
    const ranges: Record<string, [number, number]> = {
        heartRate: [60, 100],
        spo2: [95, 100],
        bodyTemperature: [36.1, 37.2],
    };
    return val >= ranges[key][0] && val <= ranges[key][1];
}

function cToF(c: number): number {
    return +(c * 9 / 5 + 32).toFixed(1);
}

function titleCase(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function getInitials(name: string): string {
    return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

export default function DashboardPage() {
    const { id } = useParams<{ id: string }>();
    const [parent, setParent] = useState<Parent | null>(null);
    const [vitals, setVitals] = useState<Vital[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    /* ── Fetch parent + vitals ──────────────────────── */
    const fetchData = useCallback(async () => {
        if (!id) return;
        setLoading(true);
        try {
            const [parentData, vitalsData] = await Promise.all([
                getParentById(id),
                getVitals(id),
            ]);
            setParent(parentData);
            setVitals(vitalsData);
        } catch (err) {
            console.error("Failed to fetch dashboard data:", err);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    /* ── Add Vital ──────────────────────────────────── */
    async function handleAddVital(data: { heartRate: number; spo2: number; bodyTemperature: number }) {
        if (!id) return;
        try {
            await createVital(id, data);
            setIsModalOpen(false);
            fetchData(); // refresh
        } catch (err) {
            console.error("Failed to create vital:", err);
        }
    }

    // Latest vital
    const latest = vitals[0] ?? null;

    const latestSync = latest
        ? new Date(latest.timestamp).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
        : "—";

    /* ── Loading skeleton ───────────────────────────── */
    if (loading) {
        return (
            <div className="font-display bg-background-light dark:bg-background-dark text-slate-100 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="glass rounded-xl p-6 animate-pulse mb-8">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-full bg-slate-700/50" />
                            <div className="flex-1 space-y-2">
                                <div className="h-6 w-1/3 bg-slate-700/50 rounded" />
                                <div className="h-4 w-1/2 bg-slate-700/30 rounded" />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="glass rounded-xl p-6 animate-pulse">
                                <div className="h-4 w-1/2 bg-slate-700/30 rounded mb-4" />
                                <div className="h-10 w-1/3 bg-slate-700/50 rounded mb-4" />
                                <div className="h-12 bg-slate-700/20 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!parent) {
        return (
            <div className="font-display bg-background-light dark:bg-background-dark text-slate-100 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <span className="material-icons text-5xl text-slate-600 mb-4 block">person_off</span>
                    <h2 className="text-xl font-semibold mb-2">Patient Not Found</h2>
                    <Link to="/" className="text-primary hover:text-primary/80 font-medium">
                        ← Back to Directory
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
            {/* Background Decorative Elements */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* ── Patient Header ──────────────────────────── */}
                <header className="mb-8 animate-fade-in">
                    <Link
                        to="/"
                        className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6 group"
                    >
                        <span className="material-icons text-sm mr-2 transition-transform group-hover:-translate-x-1">
                            arrow_back
                        </span>
                        <span className="font-medium">Back to Patients Directory</span>
                    </Link>

                    <div className="glass rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full bg-primary/15 border-2 border-primary/30 flex items-center justify-center text-primary font-bold text-xl">
                                    {getInitials(parent.name)}
                                </div>
                                <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-background-dark rounded-full" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight capitalize">{parent.name}</h1>
                                <div className="flex items-center gap-4 mt-1 text-slate-400 text-sm flex-wrap">
                                    <span className="flex items-center gap-1">
                                        <span className="material-icons text-xs">cake</span> {parent.age} Years
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="material-icons text-xs">person</span> {titleCase(parent.gender)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="material-icons text-xs">fingerprint</span> ID: #PX-{parent.patientId}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">
                                    Last Sync
                                </p>
                                <p className="text-sm font-medium">{latestSync}</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg shadow-primary/20 cursor-pointer"
                            >
                                <span className="material-icons">add</span>
                                Add Vital
                            </button>
                        </div>
                    </div>
                </header>

                {/* ── Main Content ─────────────────────────────── */}
                <main className="space-y-8">
                    {/* Latest Vitals Widgets */}
                    {latest && (
                        <section>
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <span className="material-icons text-primary text-xl">query_stats</span>
                                Latest Vitals Summary
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <VitalIndicator
                                    label="Heart Rate"
                                    value={latest.heartRate}
                                    unit="BPM"
                                    icon="favorite"
                                    isNormal={isNormal("heartRate", latest.heartRate)}
                                    statusText={isNormal("heartRate", latest.heartRate) ? "Normal Range" : "Out of Range"}
                                    sparkHeights={["40%", "60%", "50%", "80%", "45%", "55%", "65%"]}
                                />
                                <VitalIndicator
                                    label="Blood Oxygen"
                                    value={latest.spo2}
                                    unit="%"
                                    icon="air"
                                    isNormal={isNormal("spo2", latest.spo2)}
                                    statusText={isNormal("spo2", latest.spo2) ? "Normal Range" : "Below Threshold"}
                                    sparkHeights={["70%", "65%", "68%", "60%", "55%", "50%", "45%"]}
                                />
                                <VitalIndicator
                                    label="Body Temp"
                                    value={cToF(latest.bodyTemperature)}
                                    unit="°F"
                                    icon="thermostat"
                                    isNormal={isNormal("bodyTemperature", latest.bodyTemperature)}
                                    statusText={isNormal("bodyTemperature", latest.bodyTemperature) ? "Stable" : "Elevated"}
                                    sparkHeights={["50%", "50%", "52%", "48%", "50%", "50%", "50%"]}
                                />
                            </div>
                        </section>
                    )}

                    {/* Vitals History Table */}
                    <VitalsHistory vitals={vitals} />
                </main>
            </div>

            <Footer />

            {/* Add Vital Modal */}
            <AddVitalModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddVital}
            />
        </div>
    );
}
