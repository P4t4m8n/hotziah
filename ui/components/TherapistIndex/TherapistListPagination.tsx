import Link from "next/link";

interface Props {
  total: number;
  pageSize: number;
  page: number;
}
export default function TherapistListPagination({
  total,
  pageSize,
  page,
}: Props) {
  const totalPages = Math.ceil(total / pageSize);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  return (
    <div className="pagination flex justify-center gap-2 py-2">
      {pageNumbers.map((pageNumber) => {
        return (
          <Link
            className={` rounded-full w-6 h-6 text-center   ${
              +pageNumber === +page
                ? "font-bold bg-black text-white"
                : " bg-light-blue"
            } `}
            key={pageNumber}
            href={`/therapist?page=${pageNumber}`}
          >
            {pageNumber}
          </Link>
        );
      })}
    </div>
  );
}
