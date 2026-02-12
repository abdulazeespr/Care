interface VitalIndicatorProps {
    label: string;
    value: number;
    unit: string;
    icon: string;
    isNormal: boolean;
    statusText: string;
    sparkHeights: string[];
}

export default function VitalIndicator({
    label,
    value,
    unit,
    icon,
    isNormal,
    statusText,
    sparkHeights,
}: VitalIndicatorProps) {
    const color = isNormal ? "success" : "danger";
    const glowClass = isNormal ? "glow-green" : "glow-red";
    const statusIcon = isNormal
        ? value === 98.6 || statusText === "Stable"
            ? "check_circle"
            : "trending_up"
        : "warning";

    return (
        <div className="glass glass-hover rounded-xl p-6 relative overflow-hidden group animate-slide-up">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">
                        {label}
                    </p>
                    <div className="flex items-baseline gap-2">
                        <span className={`text-4xl font-bold ${glowClass} text-${color}`}>
                            {value}
                        </span>
                        <span className="text-slate-400 font-medium">{unit}</span>
                    </div>
                </div>
                <div
                    className={`w-10 h-10 rounded-lg bg-${color}/10 flex items-center justify-center`}
                >
                    <span className={`material-icons text-${color}`}>{icon}</span>
                </div>
            </div>

            <div
                className={`flex items-center gap-2 text-xs font-medium text-${color} bg-${color}/10 w-fit px-2 py-1 rounded`}
            >
                <span className="material-icons text-xs">{statusIcon}</span>
                {statusText}
            </div>

            {/* Decorative Sparkline */}
            <div className="mt-4 h-12 flex items-end gap-1">
                {sparkHeights.map((h, i) => (
                    <div
                        key={i}
                        className={`flex-1 bg-${color}/${i === sparkHeights.length - 1 ? "40" : "20"} rounded-t-sm`}
                        style={{ height: h }}
                    />
                ))}
            </div>
        </div>
    );
}
