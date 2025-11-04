import { draftReply } from "../../../lib/desk";
import { articles } from "../../../lib/articles";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const result = draftReply({ message: body.message, articles, agentName: "Lumen" });
  return Response.json(result, { status: result.ok ? 200 : 400 });
}
