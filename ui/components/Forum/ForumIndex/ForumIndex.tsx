import ForumList from "./ForumList";
import ForumIndexActions from "./ForumIndexActions";
import { IForum } from "@/service/models/forum.model";

interface Props {
  forums: IForum[];
}
/**
 * ForumIndex component manage the UI.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.forums - An array of forum objects to be displayed.
 *
 * @returns {JSX.Element} The rendered forum index component.
 */
const ForumIndex = ({ forums }: Props) => {
  return (
    <div className="bg-orange-500 p-4 h-full overflow-auto no-scrollbar">
      <ForumIndexActions />
      <ForumList forums={forums} />
    </div>
  );
};

export default ForumIndex;
