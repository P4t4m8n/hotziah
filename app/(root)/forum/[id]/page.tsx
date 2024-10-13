import { IForumDetails, IForumFilter } from "@/service/models/forum.model";
import { getEntityDetailed } from "@/service/server/generic.server";
import ForumDetailsHeader from "@/ui/components/Forum/ForumDetails/ForumDetailsHeader";
import ForumDetailsThreads from "@/ui/components/Forum/ForumDetails/ForumDetailsThreads";
import { PlusSvg } from "@/ui/Icons/Svgs";
import Link from "next/link";

export async function generateStaticParams() {
  return [{ id: "1" }];
}

export default async function ForumDetailsServer({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const forum: IForumDetails = await getEntityDetailed<
    IForumDetails,
    IForumFilter
  >({ _id: id }, "forums");

  const { name, description, threads, type } = forum;
  console.log("forum:", forum);
  console.log("type:", type);

  return (
    <div className="p-8 h-full">
      <ForumDetailsHeader name={name} type={type} />
      <div className="flex justify-between p-6">
        <p className="p-6 font-semibold text-sm">{description}</p>
        <Link
          className="bg-orange rounded-lg flex gap-2 h-12 w-32 p-2 items-center justify-center"
          href={`/forum/edit/new`}
        >
          <PlusSvg />
          <h4 className="text-xs font-bold text-blue">NEW THREAD</h4>
        </Link>
      </div>

      <ForumDetailsThreads threads={threads} />
    </div>
  );
}
