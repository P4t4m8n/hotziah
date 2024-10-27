interface Props {
  title: string;
  list: string[];
}
export default function FieldsList({ title, list }: Props) {
  return (
    <div className="w-therapist-details">
      <h2 className="font-bold text-sm border-b w-fit">{title}:</h2>
      <ul className="p-4 flex gap-4 flex-wrap  justify-center">
        {list.map((item, index) => (
          <li
            className="flex gap-2 items-center border py-1 px-2 rounded-lg"
            key={index}
          >
            <h4>{item}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
}
