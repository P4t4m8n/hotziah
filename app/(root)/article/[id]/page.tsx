import { getArticle } from "@/service/server/article.server";
import ArticleDetailsClient from "@/ui/components/ArticleIndex/ArticleDetailsClient";

export default async function ArticleDetailsServer({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const article = await getArticle(id);
  return <ArticleDetailsClient article={article} />;
}
