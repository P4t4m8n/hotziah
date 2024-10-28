import { IUserSmall } from "@/service/models/user.model";
import Image from "next/image";

interface Props {
  author: IUserSmall;
  isPost?: boolean;
}
export default function CommentUser({ author, isPost }: Props) {
  const style = isPost ? "author-container-post" : "author-container";
  return (
    <div className={style}>
      <div>
        <Image
          src={author.imgUrl || "/imgs/default-avatar.svg"}
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
}
