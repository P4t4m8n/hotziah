import { getForums } from "@/service/server/forum.server";

export default async function Form() {
  const forums = await getForums({});
  console.log("forums:", forums);
  return <div>page</div>;
}
