import React from "react";
import ArticleFilter from "./ArticleFilter";
import Link from "next/link";

export default function ArticleIndex() {
  return (
    <div>
      <header>
        <ArticleFilter />
        <Link href="/article/edit/new">חדש</Link>
      </header>
    </div>
  );
}
