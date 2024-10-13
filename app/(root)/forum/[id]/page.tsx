import { IForumDetails, IForumFilter } from "@/service/models/forum.model";
import { getEntityDetailed } from "@/service/server/generic.server";
import ForumDetailsClient from "@/ui/components/Forum/ForumDetailsClient";

export async function generateStaticParams() {
  return [{ id: "1" }];
}

export default async function ForumDetailsServer({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  let forum: IForumDetails = await getEntityDetailed<
    IForumDetails,
    IForumFilter
  >({ _id: id }, "forums");

  const { name, description, threads } = forum;

  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
}
