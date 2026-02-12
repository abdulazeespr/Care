interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
}: PaginationProps) {
    const showingCount = Math.min(itemsPerPage, totalItems - (currentPage - 1) * itemsPerPage);

    /** Build the page numbers array with ellipsis */
    function getPageNumbers(): (number | "...")[] {
        const pages: (number | "...")[] = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push("...");
            for (
                let i = Math.max(2, currentPage - 1);
                i <= Math.min(totalPages - 1, currentPage + 1);
                i++
            ) {
                pages.push(i);
            }
            if (currentPage < totalPages - 2) pages.push("...");
            pages.push(totalPages);
        }
        return pages;
    }

    return (
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/60 pt-8">
            <p className="text-sm text-slate-500">
                Showing <span className="text-slate-200">{showingCount}</span> of{" "}
                <span className="text-slate-200">{totalItems}</span> patients
            </p>

            <div className="flex items-center gap-2">
                {/* Previous */}
                <button
                    disabled={currentPage <= 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <span className="material-icons">chevron_left</span>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                    {getPageNumbers().map((p, i) =>
                        p === "..." ? (
                            <span key={`e-${i}`} className="px-2 text-slate-600">
                                ...
                            </span>
                        ) : (
                            <button
                                key={p}
                                onClick={() => onPageChange(p)}
                                className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-all ${p === currentPage
                                        ? "bg-primary text-white"
                                        : "border border-transparent text-slate-400 hover:bg-slate-800 hover:text-white"
                                    }`}
                            >
                                {p}
                            </button>
                        )
                    )}
                </div>

                {/* Next */}
                <button
                    disabled={currentPage >= totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <span className="material-icons">chevron_right</span>
                </button>
            </div>
        </div>
    );
}
