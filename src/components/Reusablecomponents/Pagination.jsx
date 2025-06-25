import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export default function Pagination({ totalPages = 10, initialPage = 1, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange?.(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    // Calculate the range of pages to show
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if end page is at max
    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Add ellipsis at the beginning if needed
    if (startPage > 1) {
      pages.push(
        <span key="start-ellipsis" className="px-1 text-gray-400">
          ...
        </span>
      );
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`flex h-8 w-8 items-center justify-center rounded-full ${
            currentPage === i ? "bg-teal-100 text-teal-600 font-medium" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {i}
        </button>
      );
    }

    // Add ellipsis at the end if needed
    if (endPage < totalPages) {
      pages.push(
        <span key="end-ellipsis" className="px-1 text-gray-400">
          ...
        </span>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center space-x-1 p-4">
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className={`flex h-8 items-center justify-center rounded-md px-2 ${
          currentPage === 1 ? "cursor-not-allowed text-gray-300" : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <ChevronsLeft className="h-4 w-4" />
        <span className="ml-1">First</span>
      </button>

      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex h-8 items-center justify-center rounded-md px-2 ${
          currentPage === 1 ? "cursor-not-allowed text-gray-300" : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="ml-1">Previous</span>
      </button>

      <div className="flex items-center space-x-1">{renderPageNumbers()}</div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex h-8 items-center justify-center rounded-md px-2 ${
          currentPage === totalPages ? "cursor-not-allowed text-gray-300" : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <span className="mr-1">Next</span>
        <ChevronRight className="h-4 w-4" />
      </button>

      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`flex h-8 items-center justify-center rounded-md px-2 ${
          currentPage === totalPages ? "cursor-not-allowed text-gray-300" : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <span className="mr-1">Last</span>
        <ChevronsRight className="h-4 w-4" />
      </button>
    </div>
  );
}
