"use client";
import { IQuestionnaire } from "@/service/models/questionnaire.model";

import QuestionnaireTitle from "./QuestionnaireEdit/QuestionnaireTitle";
import QuestionnaireSubjects from "./QuestionnaireEdit/QuestionnaireSubjects";
import QuestionnaireDescription from "./QuestionnaireEdit/QuestionnaireDescription";
import QuestionnaireRoot from "./QuestionnaireEdit/QuestionnaireRoot";
import { useQuestionnaireEdit } from "@/ui/hooks/useQuestionnaireEdit";
import { TTaxonomyName } from "@/service/models/taxonomy.model";

interface Props {
  questionnaire?: IQuestionnaire;
  taxonomies: Record<TTaxonomyName, string[]>;
}
export default function QuestionnaireEditClient({
  questionnaire,
  taxonomies,
}: Props) {
  const {
    handleChange,
    questionnaireToEdit,
    saveQuestion,
    removeQuestion,
    onSaveQuestionnaire,
  } = useQuestionnaireEdit(questionnaire);

  const { title, description, subjects, rootQuestion } = questionnaireToEdit;
  return (
    <div className="h-full overflow-auto">
      <QuestionnaireTitle title={title} handleChange={handleChange} />

      <QuestionnaireSubjects
        subjects={taxonomies.subjects}
        questionnaireSubjects={subjects}
        handleChange={handleChange}
      />

      <QuestionnaireDescription
        description={description}
        handleChange={handleChange}
      />

      <QuestionnaireRoot
        question={rootQuestion}
        removeQuestion={removeQuestion}
        saveQuestion={saveQuestion}
      />

      <button
        className="bg-black text-white p-2 rounded-md mr-[50%]"
        onClick={onSaveQuestionnaire}
      >
        Save
      </button>
    </div>
  );
}
