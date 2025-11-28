export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    stateVector: [
      Math.random(), Math.random(), Math.random(), Math.random()
    ],
    curvature: Math.random() * 0.5,
    fieldStrength: 1 + Math.random(),
    updatedAt: Date.now()
  });
}
