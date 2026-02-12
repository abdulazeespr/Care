export default function Footer() {
    return (
        <footer className="mt-20 py-10 border-t border-slate-800/40 text-center">
            <p className="text-sm text-slate-500">
                © {new Date().getFullYear()} CareConnect Dashboard.
            </p>
        </footer>
    );
}
