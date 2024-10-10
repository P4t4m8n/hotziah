import { IAnswer, IQuestion } from "@/service/models/questionnaire.model";
import EditQuestionModel from "./EditQuestionModel";
import { getEmptyQuestion } from "@/service/util/questionnaire.util";
import QuestionList from "./QuestionList";
import QuestionPreview from "./QuestionPreview";

interface Props {
  answer: IAnswer;
  saveQuestion: (question: IQuestion, parentAnswerValue?: string) => void;
  removeQuestion: (questionValue: string) => void;
}

export default function AnswerPreview({
  answer,
  saveQuestion,
  removeQuestion,
}: Props) {
  const { answerText, value, nextQuestion } = answer;

  const addFollowUpQuestion = () => {
    const newQuestion = getEmptyQuestion();
    saveQuestion(newQuestion, value); // Pass the parentAnswerValue
  };

  return (
    <li className="flex gap-4">
      <div className="bg-orange-600 p-4 rounded-lg">
        <h3>תשובה: {answerText}</h3>
        <EditQuestionModel
          question={nextQuestion || getEmptyQuestion()}
          isNew={!nextQuestion}
          answer={answer}
          saveQuestion={saveQuestion}
        />
        <button onClick={addFollowUpQuestion}>הוסף שאלה המשך</button>
      </div>

      {nextQuestion && (
        <QuestionPreview
          question={nextQuestion}
          saveQuestion={saveQuestion}
          removeQuestion={removeQuestion}
        />
      )}
    </li>
  );
}
