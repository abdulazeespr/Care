import { useState } from "react";

interface AddVitalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { heartRate: number; spo2: number; bodyTemperature: number }) => void;
}

export default function AddVitalModal({
    isOpen,
    onClose,
    onSubmit,
}: AddVitalModalProps) {
    const [heartRate, setHeartRate] = useState("");
    const [spo2, setSpo2] = useState("");
    const [bodyTemperature, setBodyTemperature] = useState("");

    if (!isOpen) return null;

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!heartRate || !spo2 || !bodyTemperature) return;
        onSubmit({
            heartRate: Number(heartRate),
            spo2: Number(spo2),
            bodyTemperature: Number(bodyTemperature),
        });
        setHeartRate("");
        setSpo2("");
        setBodyTemperature("");
    }

    const fields = [
        {
            label: "Heart Rate",
            unit: "BPM",
            icon: "favorite",
            value: heartRate,
            onChange: setHeartRate,
            min: 30,
            max: 250,
            placeholder: "e.g. 72",
        },
        {
            label: "Blood Oxygen (SpO₂)",
            unit: "%",
            icon: "air",
            value: spo2,
            onChange: setSpo2,
            min: 50,
            max: 100,
            placeholder: "e.g. 98",
        },
        {
            label: "Body Temperature",
            unit: "°C",
            icon: "thermostat",
            value: bodyTemperature,
            onChange: setBodyTemperature,
            min: 30,
            max: 45,
            step: 0.1,
            placeholder: "e.g. 36.6",
        },
    ];

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center modal-overlay animate-fade-in"
            onClick={onClose}
        >
            <div
                className="glass-card rounded-2xl w-full max-w-md mx-4 p-8 animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                            <span className="material-icons text-primary">monitor_heart</span>
                        </div>
                        <h2 className="text-xl font-bold">Add Vital Record</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all"
                    >
                        <span className="material-icons">close</span>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {fields.map((f) => (
                        <div key={f.label}>
                            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">
                                {f.label}
                            </label>
                            <div className="relative">
                                <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                                    {f.icon}
                                </span>
                                <input
                                    type="number"
                                    value={f.value}
                                    onChange={(e) => f.onChange(e.target.value)}
                                    required
                                    min={f.min}
                                    max={f.max}
                                    step={f.step ?? 1}
                                    className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl pl-11 pr-14 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-slate-600 text-slate-100"
                                    placeholder={f.placeholder}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500 font-medium">
                                    {f.unit}
                                </span>
                            </div>
                        </div>
                    ))}

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 rounded-xl text-sm font-medium border border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 rounded-xl text-sm font-medium bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                        >
                            <span className="material-icons text-sm">add</span>
                            Save Vital
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
