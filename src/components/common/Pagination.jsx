import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex items-center justify-between flex-wrap gap-4">

      <p className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex items-center gap-2">

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="
            flex h-9 w-9 items-center justify-center
            rounded-lg border
            disabled:opacity-50
            disabled:cursor-not-allowed
            hover:bg-gray-100
          "
        >
          <HiChevronLeft />
        </button>

        {getPages().map((page, index) =>
          page === "..." ? (
            <span
              key={index}
              className="px-2 text-gray-500"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`
                h-9 w-9 rounded-lg
                ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "border hover:bg-gray-100"
                }
              `}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="
            flex h-9 w-9 items-center justify-center
            rounded-lg border
            disabled:opacity-50
            disabled:cursor-not-allowed
            hover:bg-gray-100
          "
        >
          <HiChevronRight />
        </button>

      </div>
    </div>
  );
};

export default Pagination;

// usage:
// const [page, setPage] = useState(1);

// <Pagination
//   currentPage={page}
//   totalPages={15}
//   onPageChange={setPage}
// />