import test from "node:test";
import assert from "node:assert/strict";
import { draftReply, plans } from "../lib/desk.js";
import { articles } from "../lib/articles.js";

test("drafts from the invoice article", () => {
  const result = draftReply({ message: "Where is last month's invoice?", articles });
  assert.equal(result.grounded, true);
  assert.ok(result.sources.includes("Invoices"));
  assert.match(result.reply, /first of the month/);
});

test("admits when nothing matches", () => {
  const result = draftReply({ message: "Do you deliver to Mars?", articles });
  assert.equal(result.grounded, false);
});

test("plans stay small enough for a support team", () => {
  assert.equal(plans.studio.seats, 3);
  assert.ok(plans.house.drafts > plans.studio.drafts);
});
