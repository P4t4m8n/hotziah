
interface Props {
  subjects: string[];
  checkedSubjects: string[];
}
export default function ForumEditSubjects({
  subjects,
  checkedSubjects,
}: Props) {
  return (
    <div className="flex flex-col gap-2 p-2 px-4">
      <label className="font-medium" htmlFor="admins">
        Select SUbjects
      </label>
      <div className="flex flex-col h-48 overflow-auto gap-4 ">
        {subjects.map((subject) => (
          <div key={subject} className="flex items-center gap-4">
            <input
              type="checkbox"
              id={subject}
              name="subjects"
              value={subject}
              defaultChecked={checkedSubjects.some((s) => s === subject)}
              className="h-4 w-4"
            />
            <label htmlFor={subject} className="flex items-center gap-2">
              {subject}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
