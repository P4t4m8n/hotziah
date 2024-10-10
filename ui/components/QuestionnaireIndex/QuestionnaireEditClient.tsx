"use client";
import { IQuestionnaire } from "@/service/models/questionnaire.model";

import { useQuestionnaireEdit } from "@/ui/hooks/useQuestionnaireEdit";
import QuestionnaireTitle from "./QuestionnaireEdit/QuestionnaireTitle";
import QuestionnaireSubjects from "./QuestionnaireEdit/QuestionnaireSubjects";
import QuestionnaireDescription from "./QuestionnaireEdit/QuestionnaireDescription";
import QuestionnaireRoot from "./QuestionnaireEdit/QuestionnaireRoot";

interface Props {
  questionnaire: IQuestionnaire;
  saveQuestionnaire: (questionnaire: IQuestionnaire) => Promise<IQuestionnaire>;
}
export default function QuestionnaireEditClient({
  questionnaire,
  saveQuestionnaire,
}: Props) {
  const {
    handleChange,
    questionnaireToEdit,
    saveQuestion,
    removeQuestion,
    onSaveQuestionnaire,
  } = useQuestionnaireEdit(questionnaire, saveQuestionnaire);

  const { title, description, subjects, question } = questionnaireToEdit;
  return (
    <div className="h-full overflow-auto">
      <QuestionnaireTitle title={title} handleChange={handleChange} />

      <QuestionnaireSubjects subjects={subjects} handleChange={handleChange} />

      <QuestionnaireDescription
        description={description}
        handleChange={handleChange}
      />

      <QuestionnaireRoot
        question={question}
        removeQuestion={removeQuestion}
        saveQuestion={saveQuestion}
      />

      <button
        className="bg-black text-white p-2 rounded-md mr-[50%]"
        onClick={onSaveQuestionnaire}
      >
        שמור
      </button>
    </div>
  );
}
