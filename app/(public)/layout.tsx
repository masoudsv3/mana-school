import { Navbar } from "@/components/layout/navbar"; // ایمپورت مستقیم
import { Footer } from "@/components/layout/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar /> {/* استفاده مستقیم */}
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}