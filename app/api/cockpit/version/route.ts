export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    cockpit: "m7.0.0",
    nextjs: "14.2.5",
    node: process.version,
    t: Date.now(),
  });
}
