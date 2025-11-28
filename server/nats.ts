import { connect, JetStreamClient } from "nats";

let jsPromise: Promise<JetStreamClient> | null = null;

export async function getConnection() {
  return await connect({ servers: process.env.NATS_URL });
}

export async function getJetStream(): Promise<JetStreamClient> {
  if (!jsPromise) {
    const nc = await getConnection();
    jsPromise = Promise.resolve(nc.jetstream());
  }
  return jsPromise!;
}
