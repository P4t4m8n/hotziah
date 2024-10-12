import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/service/context/UserContext";

export const metadata: Metadata = {
  title: "Hotziah",
  description: "אתר לחיבור בין מטפלים למטופלים",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he">
      <body className={`antialiased min-h-screen min-w-full`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
