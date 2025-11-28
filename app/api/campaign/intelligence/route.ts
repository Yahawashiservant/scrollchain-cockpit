export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    insights: {
      cpm: (0.5 + Math.random()).toFixed(2),
      ctr: (0.01 + Math.random() * 0.1).toFixed(3),
      conv: (Math.random() * 4).toFixed(2)
    },
    t: Date.now(),
  });
}
