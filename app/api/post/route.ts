import { IPostDto } from "@/service/models/post.model";
import { createPost } from "@/service/server/post.server";
import { handleRouteError } from "@/service/server/util/error.util";
import { sanitizePostForm } from "@/service/server/util/sanitization.util";
import { validatePostDto } from "@/service/validations/post.validation";
import { NextRequest, NextResponse } from "next/server";

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
    if (
      errors.title ||
      errors.content ||
      errors.tags ||
      errors.forumId ||
      errors.authorId
    ) {
      return NextResponse.json(errors, {
        status: 422,
      });
    }
    
    console.log("data:", data)
    const post = await createPost(postDto);
    console.log("post:", post)
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    const err = handleRouteError("Failed to delete like", 500, error);
    return NextResponse.json({ ...err });
  }
}
