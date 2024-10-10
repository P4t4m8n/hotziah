import { getArticle, saveArticle } from "@/service/actions/article.server";
import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import("@/ui/TextEditor/TextEditor"), {
  ssr: false,
});

export async function generateStaticParams() {
  return [{ id: "new" }];
}
export default async function ArticleEditPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  let article;
  if (id !== "new") {
    article = await getArticle(id);
  }
  return <TextEditor saveArticle={saveArticle} article={article} />;
}