interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <div className="relative flex-1 max-w-2xl">
            <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                search
            </span>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-slate-800/40 border border-slate-700/50 rounded-xl py-3.5 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm placeholder:text-slate-500 text-slate-100"
                placeholder="Search by patient name, ID, or room number..."
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {value && (
                    <button
                        onClick={() => onChange("")}
                        className="text-slate-500 hover:text-slate-300 transition-colors"
                    >
                        <span className="material-icons text-sm">close</span>
                    </button>
                )}
            </div>
        </div>
    );
}
