"use client";

import { IArticle } from "@/service/models/article.model";
import { useEffect, useRef } from "react";
import {
  RawDraftContentBlock,
  RawDraftContentState,
  RawDraftEntityRange,
  RawDraftInlineStyleRange,
} from "draft-js";

interface Props {
  article: IArticle;
}
export default function ArticleDetailsClient({ article }: Props) {
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { blocks, entityMap } = article;
    const htmlContent = convertRawToHTML({ blocks, entityMap });
    if (articleRef.current) articleRef.current.innerHTML = htmlContent;
  }, [article]);
  return (
    <div>
      <article ref={articleRef} />
    </div>
  );
}

const convertRawToHTML = (rawContent: RawDraftContentState): string => {
  const { blocks, entityMap } = rawContent;
  const htmlBlocks: string[] = [];
  const listItems: string[] = [];
  let isList = false;
  let listType = "";

  const renderBlock = (block: RawDraftContentBlock) => {
    const blockType = block.type;
    const text = block.text;
    const inlineStyleRanges: RawDraftInlineStyleRange[] =
      block.inlineStyleRanges;
    let styledText = text;

    inlineStyleRanges.forEach((style: RawDraftInlineStyleRange) => {
      const { offset, length, style: styleType } = style;
      const start = styledText.slice(0, offset);
      const middle = styledText.slice(offset, offset + length);
      const end = styledText.slice(offset + length);

      switch (styleType) {
        case "BOLD":
          styledText = `${start}<strong>${middle}</strong>${end}`;
          break;
        case "ITALIC":
          styledText = `${start}<em>${middle}</em>${end}`;
          break;
        case "UNDERLINE":
          styledText = `${start}<u>${middle}</u>${end}`;
          break;
        default:
          break;
      }
    });

    switch (blockType) {
      case "header-one":
        htmlBlocks.push(`<h1>${styledText}</h1>`);
        break;
      case "header-two":
        htmlBlocks.push(`<h2>${styledText}</h2>`);
        break;
      case "header-three":
        htmlBlocks.push(`<h3>${styledText}</h3>`);
        break;
      case "paragraph":
        htmlBlocks.push(`<p>${styledText}</p>`);
        break;
      case "blockquote":
        htmlBlocks.push(`<blockquote>${styledText}</blockquote>`);
        break;
      case "unordered-list-item":
        isList = true;
        listType = "ul";
        listItems.push(`<li>${styledText}</li>`);
        break;
      case "ordered-list-item":
        isList = true;
        listType = "ol";
        listItems.push(`<li>${styledText}</li>`);
        break;
      case "atomic":
        const entityRanges = block.entityRanges; // Get all entity ranges
        entityRanges.forEach((range: RawDraftEntityRange) => {
          const entity = entityMap[range.key]; // Access the entity
          if (entity) {
            const { type, data } = entity;
            if (type === "IMAGE") {
              htmlBlocks.push(
                `<img width=144 height=144 src="${data.src}" alt="${
                  data.alt || ""
                }" />`
              );
            }
          }
        });
        break;
      default:
        htmlBlocks.push(`<p>${styledText}</p>`);
        break;
    }
  };

  // Convert blocks to HTML
  blocks.forEach((block) => renderBlock(block));

  // Wrap list items if we have any
  if (isList) {
    const listHTML = `<${listType}>${listItems.join("")}</${listType}>`;
    htmlBlocks.push(listHTML);
  }

  // Join all blocks into a single HTML string and maintain spacing
  return htmlBlocks.join("").replace(/<p><\/p>/g, "<p>&nbsp;</p>"); // Replace empty paragraphs with non-breaking spaces for visible spacing
};
