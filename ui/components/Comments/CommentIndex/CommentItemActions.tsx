import {
  AddNoteASvg,
  AddNoteSvg,
  PrintSvg,
  ReportSvg,
  ShareSvg,
} from "@/ui/Icons/Svgs";

interface Props {
  setIsCommentEditOpen: React.Dispatch<React.SetStateAction<boolean>>;

  isPost?: boolean;
}

export default function CommentItemActions({
  setIsCommentEditOpen,

  isPost,
}: Props) {
  const items = [
    {
      name: "Replay",
      icon: <AddNoteASvg />,
      onClick: () => setIsCommentEditOpen(true),
    },
    {
      name: "Quote",
      icon: <AddNoteSvg />,
      onClick: () => console.log("Quote"),
    },
    {
      name: "Report",
      icon: <ReportSvg />,
      onClick: () => console.log("Report"),
    },
    {
      name: "Share",
      icon: <ShareSvg />,
      onClick: () => console.log("Share"),
    },
    {
      name: "Print",
      icon: <PrintSvg />,
      onClick: () => console.log("Print"),
    },
  ];

  const listStyle = isPost
    ? " grid gap-2 fixed right-4 top-1/2 -translate-y-1/2  text-center"
    : "flex gap-2 ml-auto absolute right-4 top-[90%]";
  const btnStyle = isPost
    ? "bg-purple h-14 w-14 p-2 "
    : " bg-turquoise w-8 h-8 p-1  ";

  const textStyle = isPost ? "text-sm font-semibold" : "text-xs ";
  return (
    <ul className={listStyle}>
      {items.map((item) => (
        <li className="grid gap-1 " key={item.name}>
          <button
            className={btnStyle + "rounded-full fill-white "}
            onClick={item.onClick}
          >
            {item.icon}
          </button>
          <span className={textStyle + " text-center"}>{item.name}</span>
        </li>
      ))}
    </ul>
  );
}
