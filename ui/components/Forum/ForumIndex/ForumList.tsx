import { IForum } from "@/service/models/forum.model";
import ForumPreview from "./ForumPreview";

interface Props {
  forums: IForum[];
}
export default function ForumList({ forums }: Props) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 h-forum-index overflow-auto no-scrollbar">
      {forums.map((forum, idx) => (
        <ForumPreview key={forum.id} forum={forum} idx={idx} />
      ))}
    </ul>
  );
}

// const colorCombinations = [
//   {
//     background: "#14213D", // Oxford Blue
//     font: "#FFFFFF", // White
//   },
//   {
//     background: "#F5F5F5", // Very Light Gray
//     font: "#333333", // Charcoal Gray
//   },
//   {
//     background: "#FF5722", // Vibrant Orange
//     font: "#FFFFFF", // White
//   },
//   {
//     background: "#E0F7FA", // Pale Cyan
//     font: "#004D40", // Teal Green
//   },
//   {
//     background: "#2C3E50", // Dark Slate Blue
//     font: "#ECF0F1", // Light Silver
//   },
//   {
//     background: "#2ECC71", // Emerald Green
//     font: "#1A1A1A", // Deep Black
//   },
//   {
//     background: "#F9ED69", // Light Yellow
//     font: "#2C3A47", // Charcoal Navy
//   },
//   {
//     background: "#BDC3C7", // Silver
//     font: "#2C3E50", // Dark Slate Blue
//   },
//   {
//     background: "#8E44AD", // Amethyst Purple
//     font: "#FFFFFF", // White
//   },
//   {
//     background: "#1E1E1E", // Dark Gray
//     font: "#F0EDEE", // Light Beige
//   },
// ];
