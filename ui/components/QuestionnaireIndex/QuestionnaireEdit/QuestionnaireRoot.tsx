import { IQuestion } from "@/service/models/questionnaire.model";
import QuestionPreview from "./Questions/QuestionPreview";

interface Props {
  question: IQuestion | null;
  removeQuestion: (questionValue: string) => void;
  saveQuestion: (question: IQuestion, parentAnswerValue?: string) => void;
}

export default function QuestionnaireRoot({
  question,
  removeQuestion,
  saveQuestion,
}: Props) {
  return (
    <div className="w-full h-[23rem] overflow-auto bg-gray-950 p-4">
      <h2 className="text-white">שאלות</h2>

      {question && (
        <QuestionPreview
          question={question}
          removeQuestion={removeQuestion}
          saveQuestion={saveQuestion}
          isRoot={true}
        />
      )}
    </div>
  );
}
