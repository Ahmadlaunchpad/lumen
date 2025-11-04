import Link from "next/link";
import Studio from "../../components/Studio";
import { articles } from "../../lib/articles";

export const metadata = { title: "Desk — Lumen" };

export default function StudioPage() {
  return (
    <div className="desk-page">
      <header className="desk-top">
        <Link className="brand" href="/">Lumen</Link>
        <p>Northwind support · House plan</p>
      </header>
      <Studio articles={articles} />
    </div>
  );
}
