interface Props {
  onSaveContent: () => void;
}

export default function SaveButton({ onSaveContent }: Props) {
  return <button onClick={onSaveContent}>Save</button>;
}
