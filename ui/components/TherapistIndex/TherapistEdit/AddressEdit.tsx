import { ADDRESS_INPUTS } from "@/service/constants/formInputs";
import { IAddress } from "@/service/models/therapists.model";
import { addressService } from "@/service/service/address.service";
import TherapistEditInput from "./TherapistEditInput";

interface Props {
  addressProp?: IAddress | null;
}
export default function AddressEdit({ addressProp }: Props) {
  const address = addressProp || addressService.getEmpty();

  return (
    <ul className=" bg-slate-600 flex flex-col gap-4 ">
      <h2>Address</h2>
      {ADDRESS_INPUTS.map((input) => (
        <TherapistEditInput
          key={input.name}
          name={input.name}
          placeHolder={input?.placeHolder}
          type={input.type}
          labelText={input.label}
          //TODO:ugly make a better why to get the value
          value={
            address[input.name as keyof IAddress] != null
              ? String(address[input.name as keyof IAddress])
              : undefined
          }
        />
      ))}
      <div>
        <label htmlFor="isAccessible">Is Accessible:</label>
        <input
          id="isAccessible"
          name="address.isAccessible"
          type="checkbox"
          defaultChecked={address.isAccessible}
        />
      </div>
    </ul>
  );
}
