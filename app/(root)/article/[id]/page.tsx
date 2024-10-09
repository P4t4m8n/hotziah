import { getArticle } from "@/service/actions/article.server";
import ArticleDetailsClient from "@/ui/components/ArticleIndex/ArticleDetailsClient";
import React from "react";

export async function generateStaticParams() {
  return [{ id: "" }];
}
export default async function ArticleDetailsServer({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const article = await getArticle(id);
  return <ArticleDetailsClient article={article} />;
}
