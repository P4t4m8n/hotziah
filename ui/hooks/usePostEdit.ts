import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./useUser";

import { IPost } from "@/service/models/post.model";
import { apiClientService } from "@/service/client/api.client";
import { APIError } from "@/service/client/util/APIError";

/**
 * Custom hook for handling post editing functionality.
 * Retrieves user information, handles form submission, and saves or updates a post using the API client service.
 * Displays any validation errors and loading state during the submission process.
 * @param forumId - The ID of the forum where the post belongs.
 * @param postId - (Optional) The ID of the post to edit if provided.
 * @returns An object containing the form submission handler, validation errors, and loading state.
 */
export const usePostEdit = (forumId: string, postId?: string) => {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<TPostEditInputs, string>>({
    title: "",
    content: "",
    tags: "",
    forumId: "",
    authorId: "",
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const dataToSanitize = {
        title: formData.get("title")?.toString() || "",
        content: formData.get("content")?.toString() || "",
        tags: Array.from(formData.getAll("tags")) as string[],
      };

      const postToSave: PostToSave = {
        authorId: typeof user?.id === "string" ? user?.id : "",
        forumId: typeof forumId === "string" ? forumId : "",
        dataToSanitize,
      };

      const savedPost = postId
        ? await apiClientService.put<IPost>(`post/${postId}`, postToSave)
        : await apiClientService.post<IPost>(`post`, postToSave);

      if (!savedPost?.id) {
        throw new Error(
          "Failed to save the post. Unable to complete the save operation."
        );
      }
      router.push(`/forum/${savedPost.forumId}/post/${savedPost.id}`);
    } catch (error) {
      if ((error as APIError).status === 422) {
        setErrors(
          (error as APIError).response as Record<TPostEditInputs, string>
        );
      } else {
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { onSubmit, errors, isLoading };
};
