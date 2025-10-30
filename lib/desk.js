const stop = new Set(["the", "a", "an", "and", "or", "to", "for", "of", "in", "on", "is", "it", "my", "i", "we", "you", "our", "can", "with"]);

export function tokens(text) {
  return String(text || "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 2 && !stop.has(word));
}

export function scoreArticle(message, article) {
  const wanted = new Set(tokens(message));
  if (wanted.size === 0) return 0;
  const haystack = tokens(`${article.title} ${article.body}`);
  let hits = 0;
  for (const word of haystack) {
    if (wanted.has(word)) hits += 1;
  }
  return hits / wanted.size;
}

export function matchingArticles(message, articles, limit = 2) {
  return articles
    .map((article) => ({ article, score: scoreArticle(message, article) }))
    .filter((row) => row.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit);
}

function opening(body) {
  const match = String(body || "").match(/^(.+?[.!?])(?:\s|$)/);
  return (match ? match[1] : String(body || "").trim()).trim();
}

export function draftReply({ message, articles, agentName = "Lumen" }) {
  const question = String(message || "").trim();
  if (!question) return { ok: false, error: "Paste the customer message first." };
  const matches = matchingArticles(question, articles);
  if (matches.length === 0) {
    return {
      ok: true,
      grounded: false,
      sources: [],
      reply: `Hi,\n\nThanks for writing. I don't have an article for this yet, so a person on the team will follow up.\n\n${agentName}`,
    };
  }
  return {
    ok: true,
    grounded: true,
    sources: matches.map((row) => row.article.title),
    reply: `Hi,\n\n${matches.map((row) => opening(row.article.body)).join(" ")}\n\nReply here if that still leaves something open.\n\n${agentName}`,
  };
}

export const plans = {
  studio: { name: "Studio", price: 29, seats: 3, drafts: 80 },
  house: { name: "House", price: 89, seats: 15, drafts: 600 },
};
