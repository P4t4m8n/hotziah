interface Props {
  name: string;
  type: string;
}
export default function ForumDetailsHeader({ name, type }: Props) {
  return (
    <header
      className={`svg-background-${5} border-[1.25rem] border-neutral-50  shadow-md p-2`}
    >
      <h1 className=" text-white  text-2xl px-6">{name}</h1>
      <h2 className="forum-type text-white font-semibold text-sm px-6 ">
        {type || "Family"}
      </h2>
    </header>
  );
}
