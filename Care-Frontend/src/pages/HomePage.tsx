import { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ParentCard from "../components/ParentCard";
import Pagination from "../components/Pagination";
import AddParentModal from "../components/AddParentModal";
import Footer from "../components/Footer";
import { getParents, createParent } from "../services/parentService";
import type { Parent } from "../types";

const ITEMS_PER_PAGE = 6;

export default function HomePage() {
    const [parents, setParents] = useState<Parent[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    /* ── Debounce search ─────────────────────────────── */
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
            setCurrentPage(1);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    /* ── Fetch parents from API ──────────────────────── */
    const fetchParents = useCallback(async () => {
        setLoading(true);
        try {
            const result = await getParents(currentPage, ITEMS_PER_PAGE, debouncedQuery);
            setParents(result.data);
            setTotalPages(result.pagination.totalPages);
            setTotalCount(result.pagination.totalCount);
        } catch (err) {
            console.error("Failed to fetch parents:", err);
        } finally {
            setLoading(false);
        }
    }, [currentPage, debouncedQuery]);

    useEffect(() => {
        fetchParents();
    }, [fetchParents]);

    /* ── Add Parent ──────────────────────────────────── */
    async function handleAddParent(data: { name: string; age: number; gender: string }) {
        try {
            await createParent(data);
            setIsModalOpen(false);
            fetchParents(); // refresh list
        } catch (err) {
            console.error("Failed to create parent:", err);
        }
    }

    /* ── Skeleton Loader ─────────────────────────────── */
    function renderSkeletons() {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                    <div
                        key={i}
                        className="glass-card rounded-xl p-5 animate-pulse"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 rounded-xl bg-slate-700/50" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-3/4 bg-slate-700/50 rounded" />
                                <div className="h-3 w-1/2 bg-slate-700/30 rounded" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="h-16 bg-slate-800/40 rounded-lg" />
                            <div className="h-16 bg-slate-800/40 rounded-lg" />
                        </div>
                        <div className="h-8 bg-slate-800/30 rounded" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            {/* Decorative Glows */}
            <div className="glow-effect top-[-200px] left-[-200px]" />
            <div className="glow-effect bottom-[-200px] right-[-200px]" />

            <Header />

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* ── Top Action Bar ─────────────────────────── */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <SearchBar value={searchQuery} onChange={setSearchQuery} />
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-primary hover:bg-primary-hover text-white font-medium px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 cursor-pointer"
                    >
                        <span className="material-icons text-lg">person_add</span>
                        Add Parent
                    </button>
                </div>

                {/* ── Patient Grid ───────────────────────────── */}
                {loading ? (
                    renderSkeletons()
                ) : parents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {parents.map((parent, i) => (
                            <ParentCard key={parent._id} parent={parent} index={i} />
                        ))}
                    </div>
                ) : (
                    <div className="glass-card rounded-xl p-16 text-center animate-fade-in">
                        <span className="material-icons text-5xl text-slate-600 mb-4 block">
                            person_search
                        </span>
                        <h3 className="text-lg font-semibold text-slate-300 mb-2">
                            No patients found
                        </h3>
                        <p className="text-sm text-slate-500">
                            {debouncedQuery
                                ? "Try adjusting your search criteria."
                                : "Click \"Add Parent\" to register your first patient."}
                        </p>
                    </div>
                )}

                {/* ── Pagination ─────────────────────────────── */}
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={totalCount}
                        itemsPerPage={ITEMS_PER_PAGE}
                        onPageChange={setCurrentPage}
                    />
                )}
            </main>

            <Footer />

            {/* ── Add Parent Modal ─────────────────────────── */}
            <AddParentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddParent}
            />
        </div>
    );
}
