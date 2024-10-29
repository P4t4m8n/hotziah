interface Props {
  list: string[];
  checkAgainst?: string[];
  title: string;
  name: string;
  error?: string;
}

export default function CheckboxList({
  list,
  checkAgainst,
  title,
  name,
  error,
}: Props) {
  return (
    <div>
      <label className="py-2 block font-semibold" htmlFor={name}>
        <h3>{title}</h3>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </label>
      <ul className="flex gap-4 flex-wrap max-h-80 overflow-auto">
        {list.map((item) => (
          <li key={item} className="flex items-center gap-4 border p-1 rounded">
            <input
              type="checkbox"
              id={item}
              name={name}
              value={item}
              defaultChecked={checkAgainst?.includes(item)}
              className="h-4 w-4"
            />

            <label htmlFor={item} className="flex items-center gap-2">
              <span>{item}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
