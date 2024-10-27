// import dynamic from "next/dynamic";

// const TextEditor = dynamic(() => import("@/ui/TextEditor/TextEditor"), {
//   ssr: false,
// });

export async function generateStaticParams() {
  return [{ id: "new" }];
}
export default async function ArticleEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // let article;
  if (id !== "new") {
    // article = await getArticle(id);
  }
  // return <TextEditor article={article} />;
}
