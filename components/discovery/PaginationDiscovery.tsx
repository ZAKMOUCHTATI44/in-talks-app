import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQueryHelper } from "../utils/queryHelpers";
import { useRouter, useSearchParams } from "next/navigation";

const PaginationDiscovery = ({ totalPage }: { totalPage: number }) => {
  const { createQueryString } = useQueryHelper();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage: number = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const goToPage = (page: number) => {
    router.push(`?${createQueryString("page", page.toString())}`);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      goToPage(currentPage + 1);
    }
  };

  const pageNumbers = () => {
    if (totalPage <= 3) return Array.from({ length: totalPage }, (_, i) => i + 1);

    // Display first 3 pages, then show the last page with ellipses if needed
    if (currentPage <= 2) {
      return [1, 2, 3];
    } else if (currentPage >= totalPage - 1) {
      return [totalPage - 2, totalPage - 1, totalPage];
    } else {
      return [currentPage - 1, currentPage, currentPage + 1];
    }
  };

  return (
    <>
      {totalPage > 1 && (
        <Pagination className="mt-12">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePrevious}
                className="hover:bg-mainColor"
              />
            </PaginationItem>

            {pageNumbers().map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  className={`hover:bg-mainColor hover:text-white ${currentPage === page ? "bg-mainColor text-white" : ""}`}
                  isActive={currentPage === page}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            {totalPage > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={handleNext}
                className="hover:bg-mainColor"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default PaginationDiscovery;
