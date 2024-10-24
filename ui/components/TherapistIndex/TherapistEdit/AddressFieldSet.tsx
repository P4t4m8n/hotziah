import { IAddress } from "@/service/models/therapists.model";
import { addressService } from "@/service/service/address.service";

interface Props {
  addressProp?: IAddress | null;
}
export default function AddressFieldSet({ addressProp }: Props) {
  const address = addressProp || addressService.getEmpty();

  const { city, street, number, zipCode, floor, isAccessible, entrance } =
    address;

  const inputs = [
    {
      name: "city",
      type: "text",
      value: city,
      txt: "City:",
    },
    {
      name: "street",
      type: "text",
      value: street || "",
      txt: "Street:",
    },
    {
      name: "number",
      type: "text",
      value: number || "",
      txt: "Number:",
    },
    {
      name: "zipCode",
      type: "text",
      value: zipCode || "",
      txt: "Zip Code:",
    },
    {
      name: "entrance",
      type: "text",
      value: entrance || "",
      txt: "Entrance:",
    },
    {
      name: "floor",
      type: "text",
      value: floor || "",
      txt: "Floor:",
    },
  ];
  
  return (
    <fieldset>
      <legend>Address</legend>
      {inputs.map((input) => (
        <div key={input.name}>
          <label htmlFor={input.name}>{input.txt}</label>
          <input
            id={input.name}
            name={`address.${input.name}`}
            type={input.type}
            defaultValue={input.value}
            required={input.name === "city"}
          />
        </div>
      ))}
      <div>
        <label htmlFor="isAccessible">Is Accessible:</label>
        <input
          id="isAccessible"
          name="address.isAccessible"
          type="checkbox"
          defaultChecked={isAccessible}
        />
      </div>
    </fieldset>
  );
}
