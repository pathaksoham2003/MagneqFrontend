import React from "react";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
}) => {
  const pages = [];

  // Determine which pages to show
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", totalPages);
    } else if (currentPage > totalPages - 4) {
      pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }
  }

  const handleClick = (page) => {
    if (page !== "..." && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex flex-wrap justify-center mt-6 gap-1">
      <nav className="inline-flex items-center space-x-1">
        <button
          className="px-3 py-1 text-gray-400 bg-transparent rounded cursor-not-allowed flex items-center"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          &larr; Previous
        </button>

        {pages.map((page, idx) =>
          page === "..." ? (
            <span key={idx} className="px-2 py-1 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`px-3 py-1 rounded ${
                page === currentPage
                  ? "bg-blue-600 text-white font-semibold"
                  : "text-[rgba(var(--text))] hover:bg-[rgba(var(--hover))]"
              }`}
              onClick={() => handleClick(page)}
            >
              {page}
            </button>
          )
        )}

        <button
          className="px-3 py-1 text-[rgba(var(--text))] bg-transparent rounded flex items-center hover:bg-[rgba(var(--hover))]"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next &rarr;
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
