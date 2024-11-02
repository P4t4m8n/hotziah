/**
 * Component to display post information such as number of comments, views, and tags.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {number} props.numOfComments - The number of comments on the post.
 * @param {string[]} props.tags - The tags associated with the post.
 * @param {number} props.views - The number of views the post has received.
 * @returns {JSX.Element} A list displaying the post information.
 */
interface Props {
  numOfComments: number;
  views: number;
  tags?: string[];
}
const PostInfo = ({ numOfComments, tags, views }: Props) => {
  const postInfo = [
    { title: "Comments", value: numOfComments || 0 },
    { title: "Views", value: views },
    { title: "Tags", value: tags?.join(", ") || "No tags" },
  ];
  return (
    <ul className="flex justify-around w-full">
      {postInfo.map((info) => (
        <li key={info.title} className="max-w-1/2">
          <h2 className="text-font-size-12 text-black font-semibold">
            {info.title}:
          </h2>
          <span className="text-font-size-14 ">{info.value}</span>
        </li>
      ))}
    </ul>
  );
};
export default PostInfo;
