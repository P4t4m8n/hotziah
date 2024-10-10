interface Props {
  description: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export default function QuestionnaireDescription({
  description,
  handleChange,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="description">תקציר:</label>
      <textarea
        id="description"
        name="description"
        value={description}
        onChange={(e) => {
          if (e.target.value.length <= 255) {
            handleChange(e);
          }
        }}
        maxLength={255}
        required
        className="w-full  resize-none bg-slate-600 rounded-lg h-auto"
      />
      <p>{description.length}/255</p>
    </div>
  );
}
