import { updatePost } from "@/service/server/post.server";
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
    if (Object.keys(errors).length > 0) {
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
