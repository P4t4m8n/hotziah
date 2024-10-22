import { getTherapists } from "@/service/server/therapist.server";

export default async function Therapist() {
  const therapists = await getTherapists({});
  
  console.log("thrapist:", therapists.length);
  return <div>Therapist</div>;
}
