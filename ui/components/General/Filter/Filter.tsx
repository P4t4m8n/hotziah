import Form from "next/form";
import {
  TextInput,
  DateInput,
  NumberInput,
  CheckboxInput,
  SelectInput,
  RadioInput,
  RangeInput,
  MultiSelectInput,
} from "./Inputs";

interface FilterProps {
  route?: string;
  items: TFilterItem[];
}

const Filter: React.FC<FilterProps> = ({ route = "/", items }) => {
  return (
    <Form action={route} className=" flex flex-wrap gap-3">
      {items.map((item) => (
        <DynamicFilterInput key={item.name} item={item} />
      ))}
      <button type="submit" className="btn btn-primary">
        Apply Filters
      </button>
    </Form>
  );
};

export default Filter;

interface DynamicFilterInputProps {
  item: TFilterItem;
}

const DynamicFilterInput: React.FC<DynamicFilterInputProps> = ({ item }) => {
  const { type, name, placeHolder, labelText, options = [] } = item;

  switch (type) {
    case "text":
      return (
        <TextInput
          name={name}
          labelText={labelText}
          placeHolder={placeHolder}
        />
      );
    case "number":
      return (
        <NumberInput
          name={name}
          labelText={labelText}
          placeHolder={placeHolder}
        />
      );
    case "date":
      return (
        <DateInput
          name={name}
          labelText={labelText}
          placeHolder={placeHolder}
        />
      );
    case "checkbox":
      return <CheckboxInput name={name} labelText={labelText} />;
    case "select":
      return (
        <SelectInput name={name} labelText={labelText} options={options} />
      );
    case "radio":
      return <RadioInput name={name} labelText={labelText} options={options} />;
    case "range":
      return <RangeInput name={name} labelText={labelText} />;
    case "multiSelect":
      return (
        <MultiSelectInput name={name} labelText={labelText} options={options} />
      );
    default:
      return null;
  }
};
