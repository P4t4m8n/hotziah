import {
  getQuestionnaireById,
  saveQuestionnaire,
} from "@/service/actions/questionnaire.server";
import { getEmptyQuestionnaire } from "@/service/util/questionnaire.util";
import QuestionnaireEditClient from "@/ui/components/QuestionnaireIndex/QuestionnaireEditClient";

export async function generateStaticParams() {
  return [{ id: "new" }];
}
export default async function QuestionnaireEditServer({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  let questionnaire;
  if (id === "new") {
    questionnaire = getEmptyQuestionnaire({
      _id: "6706d5455aa062bf9efff6d5",
      username: "test",
      imgUrl: "test",
    });
  } else {
    //TODO get questionnaire from db
    questionnaire = await getQuestionnaireById(id);
  }
  return (
    <QuestionnaireEditClient
      questionnaire={questionnaire}
      saveQuestionnaire={saveQuestionnaire}
    />
  );
}
