import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className={`antialiased min-h-screen min-w-full`}>{children}</body>
    </html>
  );
}
