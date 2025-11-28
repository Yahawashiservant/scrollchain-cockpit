export const dynamic = "force-dynamic";

export async function POST() {
  return Response.json({
    repoScanner: "sync-triggered",
    scannedFiles: Math.floor(Math.random() * 500),
    updatedAt: Date.now()
  });
}
