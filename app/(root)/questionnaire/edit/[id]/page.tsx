

export async function generateStaticParams() {
  return [{ id: "new" }];
}
export default async function QuestionnaireEditServer({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  // let questionnaire;
  if (id !== "new") {
    // questionnaire = await getQuestionnaireById(id);
  }
  // return <QuestionnaireEditClient questionnaire={questionnaire} />;
}
