import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/service/context/AuthProvider";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["hebrew", "latin", "cyrillic"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
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
        className={`antialiased min-h-screen min-w-full  bg-white text-black ${openSans.className}`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
