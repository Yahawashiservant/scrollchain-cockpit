"use client";
export const useNatsStatus = () => {
  return { status: "CONNECTED", latency: 12, messagesPerSecond: 4200 };
};
