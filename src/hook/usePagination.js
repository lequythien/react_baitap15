// usePagination.js
import { useState, useEffect } from "react";

const usePagination = (totalItems, itemsPerPage) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const totalPagesCount = Math.ceil(totalItems / itemsPerPage);
        setTotalPages(totalPagesCount);
    }, [totalItems, itemsPerPage]);

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return { currentPage, totalPages, onPageChange };
};

export default usePagination;
