import { IAddress } from "@/service/models/therapists.model";
import { EmailSvg, PhoneSvg, WhatsappSvg } from "@/ui/Icons/Svgs";

interface Props {
  email: string;
  phone: string;
  address: IAddress;
}
export default function TherapistDetailsContact({
  email,
  phone,
  address,
}: Props) {
  //TODO:improve better fetching handling to no include id
  delete address.id;

  //TODO:improve better fetching handling to handle boolean
  const isAccessibleText = address.isAccessible ? "Yes" : "No";
  return (
    <div className="w-[30rem] p-4 ">
      <nav className="flex justify-between ">
        <a
          href={`mailto:${email}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex  flex-col justify-between items-center"
        >
          <EmailSvg />
          <h4>send email</h4>
        </a>
        <a
          href={`https://wa.me/${phone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex  flex-col justify-between items-center"
        >
          <WhatsappSvg />
          <h4>send massage</h4>
        </a>
        <div className="flex  flex-col justify-between items-center">
          <PhoneSvg />
          <h4>{phone}</h4>
        </div>
      </nav>

      <ul className="py-4 flex gap-4 flex-wrap  justify-center">
        {Object.entries({ ...address, isAccessible: isAccessibleText }).map(
          ([key, value]) => (
            <li
              className="flex gap-2 items-center border py-1 px-2 rounded-lg"
              key={key}
            >
              <h4 className="text-sm font-semibold">{key}:</h4>
              <h3 className="">{value}</h3>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
