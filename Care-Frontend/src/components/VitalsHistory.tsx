import type { Vital } from "../types";

interface VitalsHistoryProps {
    vitals: Vital[];
}

/* ── Vital ranges (in °C for temperature) ─────────── */
const RANGES = {
    heartRate: { min: 60, max: 100 },
    spo2: { min: 95, max: 100 },
    bodyTemperature: { min: 36.1, max: 37.2 },
};

function isInRange(key: keyof typeof RANGES, val: number): boolean {
    return val >= RANGES[key].min && val <= RANGES[key].max;
}

type RowStatus = "Normal" | "Abnormal" | "Warning";

function getRowStatus(v: Vital): RowStatus {
    const hrOk = isInRange("heartRate", v.heartRate);
    const spo2Ok = isInRange("spo2", v.spo2);
    const tempOk = isInRange("bodyTemperature", v.bodyTemperature);
    if (hrOk && spo2Ok && tempOk) return "Normal";
    if (!spo2Ok) return "Abnormal";
    return "Warning";
}

const STATUS_STYLE: Record<RowStatus, string> = {
    Normal:
        "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
    Abnormal:
        "bg-red-500/10 text-red-500 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]",
    Warning:
        "bg-amber-500/10 text-amber-500 border border-amber-500/20",
};

function formatTimestamp(iso: string) {
    const d = new Date(iso);
    const date = d.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
    const time = d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });
    return { date, time };
}

/** Convert °C → °F for display */
function cToF(c: number): number {
    return +(c * 9 / 5 + 32).toFixed(1);
}

export default function VitalsHistory({ vitals }: VitalsHistoryProps) {
    return (
        <section className="animate-slide-up" style={{ animationDelay: "200ms", animationFillMode: "backwards" }}>
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    <span className="material-icons text-primary text-xl">history</span>
                    Vitals History
                </h2>
                <div className="flex items-center gap-2">
                    <div className="glass rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm">
                        <span className="material-icons text-slate-400 text-sm">filter_list</span>
                        <span className="font-medium">All Records</span>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="glass rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10">
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Timestamp
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 text-center">
                                    Heart Rate (BPM)
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 text-center">
                                    SpO₂ (%)
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 text-center">
                                    Temp (°F)
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {vitals.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        <span className="material-icons text-4xl block mb-2 text-slate-600">
                                            monitor_heart
                                        </span>
                                        No vital records yet. Add one above.
                                    </td>
                                </tr>
                            ) : (
                                vitals.map((v) => {
                                    const status = getRowStatus(v);
                                    const { date, time } = formatTimestamp(v.timestamp);
                                    const tempF = cToF(v.bodyTemperature);

                                    return (
                                        <tr
                                            key={v._id}
                                            className={
                                                status === "Abnormal"
                                                    ? "abnormal-row transition-colors"
                                                    : "hover:bg-white/5 transition-colors"
                                            }
                                        >
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium">{date}</div>
                                                <div className="text-xs text-slate-500">{time}</div>
                                            </td>
                                            <td
                                                className={`px-6 py-4 text-center font-semibold ${!isInRange("heartRate", v.heartRate)
                                                        ? "text-amber-500"
                                                        : ""
                                                    }`}
                                            >
                                                {v.heartRate}
                                            </td>
                                            <td
                                                className={`px-6 py-4 text-center font-semibold ${!isInRange("spo2", v.spo2)
                                                        ? "text-red-500 glow-red"
                                                        : ""
                                                    }`}
                                            >
                                                {v.spo2}
                                            </td>
                                            <td
                                                className={`px-6 py-4 text-center font-semibold ${!isInRange("bodyTemperature", v.bodyTemperature)
                                                        ? "text-amber-500"
                                                        : ""
                                                    }`}
                                            >
                                                {tempF}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLE[status]}`}
                                                >
                                                    {status}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer */}
                <div className="p-4 bg-white/5 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium tracking-wide">
                        Showing {vitals.length} record{vitals.length !== 1 ? "s" : ""}
                    </span>
                </div>
            </div>
        </section>
    );
}
