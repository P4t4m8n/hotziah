import { IQuestion } from "@/service/models/questionnaire.model";
import QuestionPreview from "./QuestionPreview";

interface Props {
  question: IQuestion;
  removeQuestion: (questionValue: string) => void;
  saveQuestion: (question: IQuestion, parentAnswerValue?: string) => void;
  isRoot?: boolean;
}

export default function QuestionList({
  question,
  isRoot,
  removeQuestion,
  saveQuestion,
}: Props) {
  return (
    <ul className="">
      <QuestionPreview
        question={question}
        removeQuestion={removeQuestion}
        saveQuestion={saveQuestion}
        isRoot={isRoot}
      />
    </ul>
  );
}
