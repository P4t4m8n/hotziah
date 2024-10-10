import {
  QUESTIONNAIRE_SUBJECTS,
  TQuestionnaireSubject,
} from "@/service/models/questionnaire.model";

interface Props {
  subjects: TQuestionnaireSubject[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function QuestionnaireSubjects({
  subjects,
  handleChange,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="subjects">Subjects:</label>
      <select
        id="subjects"
        name="subjects"
        multiple
        value={subjects}
        onChange={handleChange}
      >
        {QUESTIONNAIRE_SUBJECTS.map((subject) => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </select>
    </div>
  );
}
