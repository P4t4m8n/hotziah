import { ADMIN_DASHBOARD_LINKS } from "@/service/constants/links";
import Nav from "@/ui/components/General/Nav";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="p-4 h-full">
      <Nav
        links={ADMIN_DASHBOARD_LINKS}
        navStyle="flex justify-around items-center px-[5%]"
      />
      {children}
    </section>
  );
}
