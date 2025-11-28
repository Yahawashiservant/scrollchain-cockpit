export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    provenance: "ScrollEntropy::Snapshot",
    commit: process.env.GIT_COMMIT || "unknown",
    schema: "Ω7",
    time: Date.now()
  });
}
