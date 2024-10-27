interface Props {
  questionnaireSubjects: string[];
  subjects: string[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function QuestionnaireSubjects({
  questionnaireSubjects,
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
        value={questionnaireSubjects}
        onChange={handleChange}
      >
        {subjects.map((subject) => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </select>
    </div>
  );
}
