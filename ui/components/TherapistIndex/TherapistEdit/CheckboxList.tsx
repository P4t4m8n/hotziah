interface Props {
  list: string[];
  checkAgainst?: string[];
  title: string;
  name:string
}

export default function CheckboxList({ list, checkAgainst, title,name }: Props) {
  return (
    <div>
      <label className="py-2 block font-semibold" htmlFor="subjects">{title}:</label>

      <ul className="flex gap-4 flex-wrap">
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
