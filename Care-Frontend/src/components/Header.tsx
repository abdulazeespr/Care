import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="glass-header sticky top-0 z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <span className="material-icons text-white">monitor_heart</span>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">
                        Care<span className="text-primary">Connect</span>
                    </h1>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                    <Link to="/" className="text-primary">
                        Patients
                    </Link>
                    <a href="#" className="hover:text-slate-100 transition-colors">
                        Analytics
                    </a>
                    <a href="#" className="hover:text-slate-100 transition-colors">
                        Alerts
                    </a>
                    <a href="#" className="hover:text-slate-100 transition-colors">
                        Reports
                    </a>
                </nav>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
                        <span className="material-icons">notifications</span>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
                    </button>

                    <div className="flex items-center gap-3 border-l border-slate-700/50 pl-4 ml-2">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium">Dr. Abdul Azees</p>
                            <p className="text-xs text-slate-500">Caregiver</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                            <span className="material-icons text-primary text-sm">person</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
