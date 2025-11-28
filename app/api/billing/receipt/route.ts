export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  return Response.json({
    status: "ok",
    received: body || {},
    time: Date.now()
  });
}
