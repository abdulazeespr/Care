import { Link } from "react-router-dom";
import type { Parent } from "../types";

interface ParentCardProps {
    parent: Parent;
    index: number;
}

/** Title-case a word like "male" → "Male" */
function titleCase(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
}

/** Generate initials from a name */
function getInitials(name: string): string {
    return name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

export default function ParentCard({ parent, index }: ParentCardProps) {
    return (
        <Link
            to={`/parents/${parent._id}`}
            className="glass-card rounded-xl p-5 hover:border-primary/40 hover:translate-y-[-4px] transition-all group block animate-slide-up"
            style={{ animationDelay: `${index * 80}ms`, animationFillMode: "backwards" }}
        >
            {/* Top Row */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center text-primary font-bold text-lg">
                        {getInitials(parent.name)}
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors capitalize">
                            {parent.name}
                        </h3>
                        <p className="text-xs text-slate-500">
                            ID: #PX-{parent.patientId}
                        </p>
                    </div>
                </div>
                <div
                    className="w-3 h-3 rounded-full shadow-lg bg-emerald-500 shadow-emerald-500/20"
                    title="Active"
                />
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-700/30">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                        Age / Gender
                    </p>
                    <p className="text-sm font-medium">
                        {parent.age} Yrs • {titleCase(parent.gender)}
                    </p>
                </div>
                <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-700/30">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                        Enrollment
                    </p>
                    <p className="text-sm font-medium">{formatDate(parent.createdAt)}</p>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <span className="material-icons text-primary text-xs">favorite</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                        <span className="material-icons text-orange-500 text-xs">bloodtype</span>
                    </div>
                </div>
                <span className="text-sm font-medium text-slate-400 group-hover:text-white flex items-center gap-1 transition-colors">
                    View Vitals{" "}
                    <span className="material-icons text-sm">arrow_forward</span>
                </span>
            </div>
        </Link>
    );
}
