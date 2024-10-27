import { IQuestion } from "@/service/models/questionnaire.model";
import EditQuestionModel from "./EditQuestionModel";
import AnswerList from "./AnswerList";

interface Props {
  question: IQuestion;
  isRoot?: boolean;

  removeQuestion: (questionValue: string) => void;
  saveQuestion: (question: IQuestion, parentAnswerValue?: string) => void;
}

export default function QuestionPreview({
  question,
  isRoot,
  removeQuestion,
  saveQuestion,
}: Props) {
  const { questionText, id, answers } = question;
  return (
    <div className=" w-fit flex gap-4 items-center">
      <div className="bg-red-400 p-4 rounded-lg ">
        <h3>Question: {questionText}</h3>
        <div className="flex gap-4">
          <EditQuestionModel
            question={question}
            saveQuestion={saveQuestion}
            isNew={false}
          />
          {!isRoot && (
            <button onClick={() => removeQuestion(id!)}>Delete</button>
          )}
        </div>
      </div>
      <AnswerList
        answers={answers}
        saveQuestion={saveQuestion}
        removeQuestion={removeQuestion}
      />
    </div>
  );
}
