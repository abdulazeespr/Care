import { useState } from "react";

interface AddParentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { name: string; age: number; gender: string }) => void;
}

export default function AddParentModal({
    isOpen,
    onClose,
    onSubmit,
}: AddParentModalProps) {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("Female");

    if (!isOpen) return null;

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!name.trim() || !age) return;
        onSubmit({ name: name.trim(), age: Number(age), gender });
        setName("");
        setAge("");
        setGender("Female");
    }

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
                            <span className="material-icons text-primary">person_add</span>
                        </div>
                        <h2 className="text-xl font-bold">Add New Patient</h2>
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
                    {/* Name */}
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-slate-600 text-slate-100"
                            placeholder="Enter patient name"
                        />
                    </div>

                    {/* Age */}
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">
                            Age
                        </label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                            min={0}
                            max={150}
                            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-slate-600 text-slate-100"
                            placeholder="Enter age"
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">
                            Gender
                        </label>
                        <div className="flex gap-3">
                            {["Female", "Male", "Other"].map((g) => (
                                <button
                                    key={g}
                                    type="button"
                                    onClick={() => setGender(g)}
                                    className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-all ${gender === g
                                            ? "bg-primary/20 border-primary/40 text-primary"
                                            : "bg-slate-900/50 border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                                        }`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>

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
                            Add Patient
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
