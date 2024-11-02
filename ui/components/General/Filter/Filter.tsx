import Form from "next/form";

interface Props {
  route?: string;
}
const Filter = ({ route }: Props) => {
  return <Form action={`${route ? route : "/"}`}>

  </Form>;
};

export default Filter;
