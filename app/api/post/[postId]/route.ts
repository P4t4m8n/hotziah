import { removePost, updatePost } from "@/service/server/post.server";
import { handleRouteError } from "@/service/server/util/error.util";
import { sanitizePostForm } from "@/service/server/util/sanitization.util";
import { validatePostDto } from "@/service/validations/post.validation";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles the PUT request to update a post with sanitized data.
 * Retrieves post data from the request, sanitizes it, validates it, and updates the post.
 * Returns the updated post if successful, or an error response if validation fails.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const data: PostToSave = await req.json();
    const { postId } = await params;

    const { title, content, tags } = sanitizePostForm(data.dataToSanitize);

    const postDto = {
      title,
      content,
      tags,
      forumId: data.forumId,
      authorId: data.authorId,
      id: postId,
    };

    const errors = validatePostDto(postDto);
    if (Object.values(errors).some((error) => error)) {
      return NextResponse.json(errors, {
        status: 422,
      });
    }

    const post = await updatePost(postDto);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    const err = handleRouteError("Failed to delete like", 500, error);
    return NextResponse.json(err.error, { status: +err.status });
  }
}
/**
 * Handles the DELETE request to delete a post.
 *
 * @param req - The NextRequest object containing the request details.
 * @param params - An object containing a Promise that resolves to an object with the postId to delete.
 * @returns A JSON response indicating the success or failure of the deletion operation.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    await removePost(postId);
    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
  } catch (error) {
    const err = handleRouteError("Failed to delete post", 500, error);
    return NextResponse.json(err.error, { status: +err.status });
  }
}
