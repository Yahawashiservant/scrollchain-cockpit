export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    datasetCount: 12,
    ingestionRate: (Math.random() * 2).toFixed(3),
    workers: 4,
    updatedAt: Date.now()
  });
}
