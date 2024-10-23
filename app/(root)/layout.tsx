import Footer from "@/ui/components/Footer/Footer";
import Header from "@/ui/components/Header/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
}) {
  return (
    <main className="grid ">
      <Header />
      <section className="flex flex-col ">
        {children}

        <Footer />
      </section>
    </main>
  );
}
