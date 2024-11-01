import { IComment } from "@/service/models/comments.model";
import { IPost } from "@/service/models/post.model";

export const usePrint = (item: IPost | IComment) => {
  const handlePrint = () => {

    const printWindow = window.open("", "_blank", "width=800,height=600");

    printWindow?.document.write(`
          <html>
            <head>
              <title>Print Post</title>
              <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            </head>
            <body class="p-4">
            <h1 class="text-2xl font-bold mb-4">${
              (item as IPost).title ? (item as IPost).title : "Comment"
            }</h1>
            <h2 class="text-lg font-semibold mb-4">By: ${
              item.author.username
            }</h2>
              <article>${item.content}</article>
            </body>
          </html>
        `);
    printWindow?.print();
  };

  return { handlePrint };
};
