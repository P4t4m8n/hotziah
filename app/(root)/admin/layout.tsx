import { ADMIN_DASHBOARD_LINKS } from "@/service/constants/Links";
import Nav from "@/ui/components/General/Nav";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="p-4">
      <Nav
        links={ADMIN_DASHBOARD_LINKS}
        navStyle="flex justify-around items-center px-[5%]"
      />
      {children}
    </section>
  );
}
