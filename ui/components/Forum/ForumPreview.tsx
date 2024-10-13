import { IForumDetails } from "@/service/models/forum.model";
import Image from "next/image";
import Link from "next/link";

interface Props {
  forum: IForumDetails;
  colorCombinations: { background: string; font: string };
  idx: number;
}

export default function ForumPreview({ forum, colorCombinations, idx }: Props) {
  const { name, description, _id, threads, admins, numOfThreads } = forum;

  const date = formatDateFromObjectId(threads[0]?.posts[0]?.createdDateFromId);

  return (
    <li className="rounded-lg p-4 shadow-sm border hover:shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-300">
      <Link
        href={`/forum/${_id}`}
        className="w-full h-full flex flex-col gap-4"
      >
        <h1
          className={`text-l flex items-center font-bold svg-background-${
            idx % 23
          } text-white h-18 p-4 py-6 rounded-xl font-semibold`}
        >
          {name.toUpperCase()}
        </h1>
        <div className="flex gap-10">
          <span className="">
            <h3 className="text-platinum font-semibold text-sm">Topics</h3>
            <h2 className="font-bold ">{numOfThreads || 0}</h2>
          </span>

          <span className="">
            <h3 className="text-platinum font-semibold text-sm">
              Last Activity
            </h3>
            <div className="font-bold">{date}</div>
          </span>
        </div>
        <p className="text-platinum flex-grow">{description}</p>{" "}
        <div className="mt-auto">
          <h2 className="text-platinum font-semibold text-sm pb-2">
            LAST TOPIC
          </h2>
          <div className="h-8 flex gap-4 px-2">
            <Image
              width={32}
              height={32}
              src={threads[0]?.author.imgUrl || ""}
              alt="user"
              className="rounded-full"
            />
            <h2 className="font-bold truncate">{threads[0].name}</h2>
          </div>
        </div>
      </Link>
    </li>
  );
}

const formatDateFromObjectId = (input?: string | Date): string => {
  if (!input) {
    return "No activity yet";
  }
  let date: Date;

  if (typeof input === "string") {
    date = new Date(parseInt(input.substring(0, 8), 16) * 1000);
  } else {
    date = input;
  }

  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  if (date >= today) {
    return `Today, ${hours}:${minutes}`;
  } else if (date >= yesterday) {
    return `Yesterday, ${hours}:${minutes}`;
  } else {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().substring(2);
    return `${day}:${month}:${year}`;
  }
};
