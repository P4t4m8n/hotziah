import Footer from "@/ui/components/Footer/Footer";
import Header from "@/ui/components/Header/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid ">
      <Header />
      <section className="h-main-hight bg-slate-400">{children}</section>
      <Footer />
    </main>
  );
}
