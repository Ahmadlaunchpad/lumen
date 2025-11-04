"use client";

import { useState } from "react";

export default function Studio({ articles }) {
  const [message, setMessage] = useState("Where can I find last month's invoice?");
  const [draft, setDraft] = useState("The reply will land here.");
  const [sources, setSources] = useState("");
  const [busy, setBusy] = useState(false);

  async function onDraft() {
    setBusy(true);
    const response = await fetch("/api/draft", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    setDraft(data.reply || data.error);
    setSources(data.sources?.length ? `From ${data.sources.join(", ")}` : "No matching article");
    setBusy(false);
  }

  return (
    <div className="desk">
      <section className="column">
        <h2>Articles</h2>
        <div className="article-list">
          {articles.map((article) => (
            <button key={article.title} type="button" onClick={() => setMessage(`Tell me about ${article.title.toLowerCase()}.`)}>
              {article.title}
              <small>{article.topic}</small>
            </button>
          ))}
        </div>
      </section>
      <section className="column">
        <h2>Customer</h2>
        <textarea value={message} onChange={(event) => setMessage(event.target.value)} />
        <div className="row">
          <button className="solid" type="button" onClick={onDraft} disabled={busy}>
            {busy ? "Drafting" : "Draft reply"}
          </button>
          <p className="sources">{sources}</p>
        </div>
      </section>
      <section className="column">
        <h2>Reply</h2>
        <pre className="draft">{draft}</pre>
      </section>
    </div>
  );
}
