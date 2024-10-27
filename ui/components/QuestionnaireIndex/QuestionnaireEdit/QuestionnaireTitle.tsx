interface Props {
  title: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function QuestionnaireTitle({ title, handleChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="" htmlFor="title">
        Title:
      </label>
      <input
        id="title"
        name="title"
        type="text"
        value={title}
        onChange={handleChange}
        placeholder=""
        className="w-title-bar bg-slate-600 rounded-lg"
        required
      />
    </div>
  );
}
