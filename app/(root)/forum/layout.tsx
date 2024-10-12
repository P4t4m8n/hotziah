import React from "react";

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
