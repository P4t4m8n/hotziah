import TherapistFilter from "./TherapistFilter";
import TherapistEditLinkClient from "./TherapistIndexHeader/TherapistEditLinkClient";

interface Props {
  taxonomies: Record<TTaxonomyName, string[]>;
}

export default function TherapistHeader({ taxonomies }: Props) {
  return (
    <div className="flex justify-around h-16 py-4">
      <TherapistFilter taxonomies={taxonomies} />
      <TherapistEditLinkClient />
    </div>
  );
}
