interface Props {
  list: string[];
  checkAgainst?: string[];
  title: string;
}

export default function CheckboxList({ list, checkAgainst, title }: Props) {
  return (
    <div>
      <label htmlFor="subjects">{title}:</label>

      <ul>
        {list.map((item) => (
          <li key={item} className="flex items-center gap-4">
            <input
              type="checkbox"
              id={item}
              name={item}
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
