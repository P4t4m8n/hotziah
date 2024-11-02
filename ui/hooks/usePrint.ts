import { IComment } from "@/service/models/comments.model";
import { IPost } from "@/service/models/post.model";
import xss from "xss";
/**
 * Generates a print window for the provided post or comment item.
 * Sanitizes the title and content for security using xss library.
 * Displays the item details in a formatted manner for printing.
 * @param item The post or comment item to print.
 * @returns Returns a function to handle the printing functionality.
 */
export const usePrint = (item: IPost | IComment) => {
  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "width=800,height=600");

    const sanitizedTitle = "title" in item ? xss(item.title) : "Comment";
    const sanitizedContent = xss(item.content);

    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print ${"title" in item ? "Post" : "Comment"}</title>
           <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            <style>
              ${`p-4`}
            </style>
          </head>
          <body>
            <h1 class="text-2xl font-bold mb-4">${sanitizedTitle}</h1>
            <h2 class="text-lg font-semibold mb-4">By: ${
              item.author.username
            }</h2>
            <article>${sanitizedContent}</article>
          </body>
        </html>
      `);

      printWindow.print();
      printWindow.close();
    }
  };

  return { handlePrint };
};
