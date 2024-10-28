import { formatDate } from "@/service/client/util/app.util";

interface Prop {
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export default function PostHeader({ title, createdAt, updatedAt }: Prop) {
  return (
    <header>
      <h1 className="text-3xl  font-extrabold text-black">{title}</h1>
      <div className="flex gap-2 font-semibold ">
        <span className="flex gap-1 items-center ">
          <h5 className="text-xs ">Created:</h5>
          <h4 className="text-sm">{formatDate(createdAt)}</h4>
        </span>
        {updatedAt && (
          <span className="flex gap-1 items-center">
            <h5 className="text-xs">Update:</h5>
            <h4 className="text-sm">{formatDate(createdAt)}</h4>
          </span>
        )}
      </div>
    </header>
  );
}
