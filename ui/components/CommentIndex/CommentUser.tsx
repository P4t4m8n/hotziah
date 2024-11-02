import Image from "next/image";
import { IUserSmall } from "@/service/models/user.model";

/**
 * Component to display user information in a comment.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.author - The author object containing user information.
 * @param {string} props.author.imgUrl - The URL of the author's avatar image.
 * @param {string} props.author.username - The username of the author.
 * @param {string} props.author.permission - The permission level of the author.
 * @param {string} [props.author.therapistType] - The type of therapist, if applicable.
 * @param {boolean} props.isPost - Flag to determine if the comment is a post.
 * @returns {JSX.Element} The rendered component displaying the author's information.
 */
interface Props {
  author: IUserSmall;
  isPost?: boolean;
}
const CommentUser = ({ author, isPost }: Props) => {
  const imgUrl = author.imgUrl || "/imgs/default-avatar.svg";
  const containerStyle = isPost ? "author-container-post" : "author-container";
  return (
    <div className={containerStyle}>
      <div>
        <Image
          src={imgUrl}
          alt="author-image"
          width={24}
          height={24}
          className="author-image"
        />
        <h2>{author.username}</h2>
      </div>
      <h3>{author.permission}</h3>
      {author.therapistType && <h3>{author.therapistType}</h3>}
    </div>
  );
};
export default CommentUser;
