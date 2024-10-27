import { getQuestionnaireById } from "@/service/server/questionnaire.server";
import { getTaxonomies } from "@/service/server/taxonomy.server";
import QuestionnaireEditClient from "@/ui/components/QuestionnaireIndex/QuestionnaireEditClient";

export async function generateStaticParams() {
  return [{ id: "new" }];
}
export default async function QuestionnaireEditServer({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let questionnaire;
  //If id IS new, will get it in the client to have access to the user while keeping the static generation
  if (id !== "new") {
    questionnaire = await getQuestionnaireById(id);
  }

  const taxonomies = await getTaxonomies({});
  return <QuestionnaireEditClient questionnaire={questionnaire} taxonomies={taxonomies} />;
}
