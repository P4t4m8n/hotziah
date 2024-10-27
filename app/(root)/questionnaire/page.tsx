import Link from "next/link";

export default function Questionnaire() {
  return (
    <div>
      <Link
        className="bg-orange rounded-lg flex gap-2 h-12 w-32 p-2 items-center justify-center"
        href="/questionnaire/edit/new"
      >
        NEW
      </Link>
    </div>
  );
}
