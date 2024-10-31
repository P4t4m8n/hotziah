import { IPostDto } from "@/service/models/post.model";
import { createPost } from "@/service/server/post.server";
import { handleRouteError } from "@/service/server/util/error.util";
import { sanitizePostForm } from "@/service/server/util/sanitization.util";
import { validatePostDto } from "@/service/validations/post.validation";
import { NextRequest, NextResponse } from "next/server";
/**
 * Handles the POST request to create a new post by sanitizing the form data, validating the post DTO, and creating the post.
 * If successful, returns the created post with a 201 status code; otherwise, returns an error with a 422 or 500 status code.
 * @param req The NextRequest object containing the request data.
 */
export async function POST(req: NextRequest) {
  try {
    const data: PostToSave = await req.json();

    const { title, content, tags } = sanitizePostForm(data.dataToSanitize);

    const postDto: IPostDto = {
      title,
      content,
      tags,
      forumId: data.forumId,
      authorId: data.authorId,
    };

    const errors = validatePostDto(postDto);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(errors, {
        status: 422,
      });
    }

    const post = await createPost(postDto);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    const err = handleRouteError("Failed to delete like", 500, error);
    return NextResponse.json(err.error, { status: +err.status });
  }
}
