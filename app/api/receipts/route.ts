export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    receipts: [],
    time: Date.now(),
  });
}
