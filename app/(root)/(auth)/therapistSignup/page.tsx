
import { getTaxonomies } from "@/service/server/taxonomy.server";
import TherapistSignup from "@/ui/components/AuthClient/TherapistSignup";

export default async function TherapistSignupServer() {

  const taxonomies = await getTaxonomies({});

  return <TherapistSignup taxonomies={taxonomies} />;
}
