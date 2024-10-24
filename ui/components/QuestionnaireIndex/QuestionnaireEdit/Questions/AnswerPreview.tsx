import { IAnswer, IQuestion } from "@/service/models/questionnaire.model";
import EditQuestionModel from "./EditQuestionModel";
import QuestionPreview from "./QuestionPreview";
import { questionnaireService } from "@/service/service/questionnaire.service";

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
    const newQuestion = questionnaireService.getEmptyQuestion();
    saveQuestion(newQuestion, value); // Pass the parentAnswerValue
  };

  return (
    <li className="flex gap-4">
      <div className="bg-orange-600 p-4 rounded-lg">
        <h3>תשובה: {answerText}</h3>
        <EditQuestionModel
          question={nextQuestion || questionnaireService.getEmptyQuestion()}
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
