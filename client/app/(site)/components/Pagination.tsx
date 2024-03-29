"use client";
import React, { useState } from "react";

interface PaginationProps {
  currentPage: number;
  numTotalPages: number;
  onChangePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  numTotalPages,
  onChangePage,
}) => {
  var hasPrev = currentPage > 1;
  var hasNext = currentPage < numTotalPages;

  return (
    <div className="flex items-center justify-center gap-x-4 text-base mb-8 mt-5">
      {/* <button onClick={() => onChangePage(1)}>
        &lt;&lt;
      </button> */}

      <button
        onClick={() => hasPrev && onChangePage(currentPage - 1)}
        className={hasPrev ? "active" : "inactive text-transparent"}
      >
        &lt;
      </button>

      {Array.from({ length: numTotalPages }, (_, i) => i + 1).map((page) => {
        let buttonClasses = "";
        if (currentPage === page) {
          buttonClasses = "active text-blue-300";
        }
        return (
          <button
            key={page}
            onClick={() => onChangePage(page)}
            className={buttonClasses}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => hasNext && onChangePage(currentPage + 1)}
        className={hasNext ? "active" : "inactive text-transparent"}
      >
        &gt;
      </button>

      {/* <button onClick={() => onChangePage(numTotalPages)}>
        &gt;&gt;
      </button> */}
    </div>
  );
};
export default Pagination;
