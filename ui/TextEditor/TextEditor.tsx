"use client";

import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { uploadImg } from "@/service/util/uploadImg";
import { IArticle } from "@/service/models/article.model";
import Image from "next/image";
import { articleClientService } from "@/service/client/article.client";

interface Props {
  article?: IArticle;
}

export default function TextEditor({ article }: Props) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState(article?.title || "");
  const [description, setDescription] = useState(article?.description || "");
  const [imageUrl, setImageUrl] = useState(article?.imgUrl || "");

  useEffect(() => {
    if (article) {
      const { blocks, entityMap } = article;
      const contentState = convertFromRaw({ blocks, entityMap });
      setEditorState(EditorState.createWithContent(contentState));
    } else {
      setEditorState(EditorState.createEmpty());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  const uploadCallback = async (file: Blob) => {
    const imgUrl = await uploadImg(file);
    setImageUrl(imgUrl);
    return { data: { link: imgUrl } };
  };

  const onSaveContent = async () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);

    const articleData: IArticle = {
      title,
      description,
      ...rawContent,
      author: {
        _id: "6706d5455aa062bf9efff6d5",
        username: "Therapist",
        imgUrl: "",
        permission: "admin",
        firstName: "Therapist",
        lastName: "Therapist",
      },
      imgUrl: imageUrl,
    };

    const _article = await articleClientService.create(articleData);
  };

  return (
    <form
      className="h-full flex flex-col p-4 gap-4 overflow-auto"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onSaveContent();
      }}
    >
      <div className="flex flex-col gap-2">
        <label className="" htmlFor="title">
          כותרת:
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder=""
          className="w-title-bar bg-slate-600 rounded-lg"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description">תקציר:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => {
            if (e.target.value.length <= 255) {
              setDescription(e.target.value);
            }
          }}
          maxLength={255}
          required
          className="w-full  resize-none bg-slate-600 rounded-lg h-auto"
        />
        <p>{description.length}/255</p>
      </div>

      <div>
        <label
          htmlFor="imageUpload"
          className="w-32 h-32 block relative bg-slate-600"
        >
          {imageUrl ? (
            <Image src={imageUrl} fill alt="article" className="cover" />
          ) : (
            "העלה תמונה"
          )}
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) {
              await uploadCallback(file);
            }
          }}
          hidden
        />
      </div>

      <Editor
        editorClassName="editor-container"
        editorState={editorState}
        onEditorStateChange={onChange}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: {
            previewImage: true,
            uploadCallback,
            alt: { present: true, mandatory: true },
          },
        }}
      />

      <button type="submit" className="btn-primary">
        שמור
      </button>
    </form>
  );
}
