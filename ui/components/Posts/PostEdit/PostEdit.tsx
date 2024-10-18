import { ITtextAreaProps } from "@/service/models/app.model";
import { IPost } from "@/service/models/posts.model";
import TextArea from "../../General/TextArea";
import { useUser } from "@/ui/hooks/useUser";
import { IUser } from "@/service/models/user.model";
import { Dispatch, SetStateAction } from "react";
import { savePost } from "@/service/server/post.server";

interface Props {
  post?: IPost;
  parentId?: string;
  setCommentsState: Dispatch<SetStateAction<IPost[]>>;
  setIsForumModelOpen: Dispatch<SetStateAction<boolean>>;
}

export default function PostEdit({
  post,
  setCommentsState,
  setIsForumModelOpen,
  parentId,
}: Props) {
  const user = useUser().user;
  const _post =
    post ||
    getEmptyPost(
      {
        _id: "670e47ce099ef5b0d6514c2a",
        username: "Jared.Hermann3",
        imgUrl: "https://avatars.githubusercontent.com/u/44423954",
      },
      parentId!
    );

  const textArea: ITtextAreaProps = {
    divStyle: "flex flex-col gap-2 p-2 px-4",
    labelStyle: "font-medium",
    inputStyle: "bg-slate-100 rounded-lg p-2 py-4 px-6 h-80 resize-none",
    labelText: "",
    name: "content",
    value: _post.content,
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Call the server action to save the post
    const savedPost = await savePost(formData, _post);

    // You can now do something with the saved post, e.g., update state
    setCommentsState((prevState) => [...prevState, savedPost]);
    setIsForumModelOpen(false); // Close the modal after saving the post
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-post-edit-form w-full flex flex-col "
    >
      <TextArea textAreaProps={textArea} />
      <div className="self-center mt-auto w-full flex gap-4 px-4 justify-end">
        <button
          onClick={() => setIsForumModelOpen(false)}
          className="bg-platinum text-sm font-semibold rounded-md flex gap-2 h-6 w-20 p-2 px-4 items-center justify-center "
        >
          CANCEL
        </button>
        <button
          type="submit"
          className="bg-orange text-sm font-semibold rounded-md flex gap-2 h-6 w-28 p-2 px-4 items-center justify-center "
        >
          ADD POST
        </button>
      </div>
    </form>
  );
}

const getEmptyPost = (author: IUser, parentId: string): IPost => {
  return {
    _id: "",
    parentId,
    content: "",
    author,
    comments: [],
  };
};
