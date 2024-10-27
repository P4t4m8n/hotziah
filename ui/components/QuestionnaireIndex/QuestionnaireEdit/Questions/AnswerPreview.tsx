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
  const { answerText, id, nextQuestion } = answer;

  const addFollowUpQuestion = () => {
    const newQuestion = questionnaireService.getEmptyQuestion();
    saveQuestion(newQuestion, id); // Pass the parentAnswerValue
  };

  return (
    <li className="flex gap-4">
      <div className="bg-orange-600 p-4 rounded-lg">
        <h3>Answer: {answerText}</h3>
        <EditQuestionModel
          question={nextQuestion || questionnaireService.getEmptyQuestion()}
          isNew={!nextQuestion}
          answer={answer}
          saveQuestion={saveQuestion}
        />
        <button onClick={addFollowUpQuestion}>Add follow-up question</button>
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
