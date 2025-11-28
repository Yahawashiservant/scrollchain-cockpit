export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    kernel: "ScrollKernel Ω",
    status: "online",
    load: Math.random().toFixed(3),
    agents: 144,
    uptime: process.uptime(),
    timestamp: Date.now()
  });
}
