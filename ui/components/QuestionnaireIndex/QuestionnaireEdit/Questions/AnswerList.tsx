import { IAnswer, IQuestion } from "@/service/models/questionnaire.model";
import AnswerPreview from "./AnswerPreview";

interface Props {
  answers: IAnswer[];
  saveQuestion: (question: IQuestion, parentAnswerValue?: string) => void;
  removeQuestion: (questionValue: string) => void;
}

export default function AnswerList({
  answers,
  saveQuestion,
  removeQuestion,
}: Props) {
  return (
    <ul className=" pr-4 flex flex-col gap-4 relative">
      {answers.map((answer) => (
        <AnswerPreview
          key={answer.value}
          answer={answer}
          saveQuestion={saveQuestion}
          removeQuestion={removeQuestion}
        />
      ))}
    </ul>
  );
}
