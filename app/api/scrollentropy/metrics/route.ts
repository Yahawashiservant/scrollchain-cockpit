export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    entropyIndex: Math.random().toFixed(5),
    divergence: Math.random().toFixed(5),
    holographicMass: Math.random().toFixed(5),
    coherence: Math.random().toFixed(5),
    timestamp: Date.now()
  });
}
