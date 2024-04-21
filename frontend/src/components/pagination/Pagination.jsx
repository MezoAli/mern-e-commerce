import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getAllSearchParams } from "@/lib/getAllSearchParams";

const PaginationComp = ({ productsPerPage, filteredProductsCount }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const allSearchParams = getAllSearchParams(searchParams);
  const numberOfPages = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredProductsCount / productsPerPage);
    i++
  ) {
    numberOfPages.push(i);
  }

  return (
    <div>
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem className="cursor-pointer">
              <PaginationPrevious
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                  setSearchParams({
                    ...allSearchParams,
                    page: currentPage - 1,
                  });
                }}
              />
            </PaginationItem>
          )}
          {numberOfPages.map((index) => {
            return (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={searchParams.get("page") == index}
                  className={`cursor-pointer ${
                    searchParams.get("page") == index && "bg-orange-500"
                  }`}
                  onClick={() => {
                    setCurrentPage(index);
                    setSearchParams({ ...allSearchParams, page: index });
                  }}
                >
                  {index}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          {currentPage == numberOfPages[numberOfPages.length - 1] ? (
            ""
          ) : (
            <PaginationItem className="cursor-pointer">
              <PaginationNext
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                  setSearchParams({
                    ...allSearchParams,
                    page: currentPage + 1,
                  });
                }}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationComp;
