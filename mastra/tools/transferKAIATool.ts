// src/mastra/tools/transferHederatool.ts
import { createTool } from "@mastra/core";
import { z } from "zod";

export const transferHederaTool = createTool({
  id: "transferHedera",
  description: "Suggests how to transfer native Hedera using Telegram bot commands.",
  inputSchema: z.object({
    receiverAddress: z.string().optional().describe("Hedera wallet address"),
    username: z.string().optional().describe("Telegram username of recipient"),
    amount: z.number().optional().describe("Amount of Hedera to transfer"),
  }),
  outputSchema: z.object({
    message: z.string().describe("Suggested Telegram bot command"),
  }),
  execute: async ({ context }) => {
    const { receiverAddress, username, amount } = context;

    const amt = amount || 1;
    const byAddress = receiverAddress
      ? `/transferHedera ${receiverAddress} ${amt}`
      : null;

    const byUsername = username
      ? `/transferHedera @${username} ${amt}`
      : null;

    const message = [byUsername, byAddress]
      .filter(Boolean)
      .map(cmd => `🚀 Tap or send: \`${cmd}\``)
      .join("\n") ||
      `To transfer Hedera, send one of the following commands:\n` +
      `\`/transferhbar 0.0.xxxx amount\`\n` +
      `or\n\`/transferhbar @username amount\``;

    return { message };
  },
});
