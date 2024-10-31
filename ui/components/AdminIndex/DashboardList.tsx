import { ITherapist } from "@/service/models/therapists.model";
import { IUser } from "@/service/models/user.model";
import UserItem from "./UserDashboard/UserItem";
import TherapistItem from "./TherapistDashboard.tsx/TherapistItem";

interface Props {
  listHeaders: string[];
  items: ITherapist[] | IUser[];
  type: "therapist" | "user";
}

export default function DashboardList({ listHeaders, items, type }: Props) {
  return (
    <div>
      <ul
        className="grid border-b w-full "
        style={{
          gridTemplateColumns: `repeat(${listHeaders.length}, minmax(0, 1fr))`,
        }}
      >
        {listHeaders.map((header) => (
          <li key={header}>{header}</li>
        ))}
      </ul>
      <DynamicItem items={items} type={type} />
    </div>
  );
}

interface DynamicItemProps {
  items: ITherapist[] | IUser[];
  type: "therapist" | "user";
}
function DynamicItem(props: DynamicItemProps) {
  const { items, type } = props;

  switch (type) {
    case "therapist":
      return (
        <ul className="flex gap-2 flex-col h-user-list overflow-auto no-scrollbar">
          {(items as ITherapist[]).map((therapist: ITherapist) => (
            <TherapistItem therapist={therapist} key={therapist.id} />
          ))}
        </ul>
      );
    case "user":
      return (
        <ul className="flex gap-2 flex-col h-user-list overflow-auto no-scrollbar">
          {(items as IUser[]).map((user: IUser) => (
            <UserItem user={user} key={user.id} />
          ))}
        </ul>
      );
    default:
      return null;
  }
}
