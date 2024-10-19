import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/service/context/AuthProvider";

export const metadata: Metadata = {
  title: "Hotziah",
  description: "Hotziah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he">
      <body
        className={`antialiased min-h-screen min-w-full  bg-white text-black`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
