export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    functions: [
      "farm-irrigate",
      "scrollentropy",
      "kernel-resolve",
      "billing-sync"
    ],
    time: Date.now()
  });
}
