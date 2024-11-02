import { IUserSmall } from "@/service/models/user.model";
import { EditBtnSvg, PlusSvg } from "@/ui/Icons/Svgs";

import UserListIcons from "./AdminList";
import GeneralLink from "../../General/GeneralLink";
import ProtectedAdminLink from "@/ui/guards/ProtectedLink";

/**
 * Component for displaying forum details actions.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.description - The description of the forum.
 * @param {Array} props.admins - The list of admin users.
 * @param {string} props.id - The unique identifier of the forum.
 * @returns {JSX.Element} The rendered component.
 */
interface Props {
  description: string;
  admins: IUserSmall[];
  id: string;
}
const ForumDetailsActions = ({ description, admins, id }: Props) => {
  return (
    <div className="flex justify-between items-center p-6">
      <p className=" font-semibold text-sm line-clamp-2 max-w-[50ch]">
        {description}
      </p>
      <UserListIcons users={admins} listName="Admins" />
      <div className="flex gap-2 fixed bottom-20 right-8">
        <ProtectedAdminLink>
          <GeneralLink
            href={`/forum/edit/${id}`}
            text={"EDIT FORUM"}
            svg={<EditBtnSvg />}
          />
        </ProtectedAdminLink>
        <GeneralLink
          href={`/forum/${id}/post/edit/new`}
          text={"NEW THREAD"}
          svg={<PlusSvg />}
        />
      </div>
    </div>
  );
};

export default ForumDetailsActions;
