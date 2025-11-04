import Link from "next/link";

export default function HomePage() {
  return (
    <div className="page">
      <header className="nav">
        <span className="brand">Lumen</span>
        <nav>
          <a href="#plans">Plans</a>
          <Link className="button" href="/studio">Open the desk</Link>
        </nav>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">AI support desk</p>
          <h1>Answer in the words you already wrote.</h1>
          <p className="lede">
            Lumen reads your help articles and drafts the reply. Your team checks it, then sends it. No outside model is required to try the desk.
          </p>
          <Link className="button solid" href="/studio">Draft a reply</Link>
        </div>
        <article className="preview">
          <p className="preview-label">Draft · Invoices</p>
          <p>Hi,</p>
          <p>Invoices go out on the first of the month and stay on the billing page for a year.</p>
          <p className="sign">Lumen</p>
        </article>
      </section>

      <section className="steps">
        <div>
          <span>01</span>
          <h2>Keep the articles</h2>
          <p>Short help pages, one topic each. Lumen only uses what you stored.</p>
        </div>
        <div>
          <span>02</span>
          <h2>Paste the message</h2>
          <p>The desk scores the customer’s words against those articles.</p>
        </div>
        <div>
          <span>03</span>
          <h2>Send your version</h2>
          <p>The draft stays in your voice. Edit a line if the article is not enough.</p>
        </div>
      </section>

      <section className="plans" id="plans">
        <article>
          <h3>Studio</h3>
          <p className="price">$29</p>
          <p>3 seats · 80 drafts a day</p>
        </article>
        <article className="featured">
          <h3>House</h3>
          <p className="price">$89</p>
          <p>15 seats · 600 drafts a day</p>
        </article>
      </section>
    </div>
  );
}
