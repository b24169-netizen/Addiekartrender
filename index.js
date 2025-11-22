import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
import { detectIntent } from "./lib/intents.js";
import { answerFAQ } from "./lib/faq.js";
import { findOrder } from "./lib/orders.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

async function gptFallback(prompt) {
  const key = process.env.GROQ_API_KEY;
  if (!key) return "I'm not fully sure. I can connect you to a human agent.";
  try {
    const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "You are a concise e-commerce support assistant. If unsure, ask for orderId/email/phone or escalate." },
          { role: "user", content: prompt }
        ],
        temperature: 0.2
      })
    });
    const data = await resp.json();
    return data?.choices?.[0]?.message?.content || "Sorry, I couldn't generate an answer.";
  } catch {
    return "I'm not fully sure. I can connect you to a human agent.";
  }
}

app.post("/api/chat", async (req, res) => {
  const { message, orderId, email, phone } = req.body || {};
  const intent = detectIntent(message || "");

  if (intent === "FAQ") {
    const a = answerFAQ(message);
    if (a) return res.json({ intent, answer: a, escalate: false });
  }

  if (intent === "ORDER_STATUS") {
    const order = findOrder({ orderId, email, phone });
    if (!order) {
      return res.json({
        intent,
        answer: "I couldn't find that order. Share orderId (e.g., 12345) or the email/phone linked to the order.",
        needVerification: true,
        escalate: false
      });
    }
    return res.json({
      intent,
      answer: `Order ${order.orderId}: ${order.status}. ETA: ${order.eta}. Return eligible until ${order.return.eligibleUntil}.`,
      order,
      escalate: false
    });
  }

  if (intent === "REFUND_STATUS") {
    const order = findOrder({ orderId, email, phone });
    if (!order) {
      return res.json({
        intent,
        answer: "To check refund, share orderId / email / phone linked to that order.",
        needVerification: true,
        escalate: false
      });
    }
    return res.json({
      intent,
      answer: `Refund status for ${order.orderId}: ${order.refund.status}${order.refund.date ? ` (on ${order.refund.date})` : ""}.`,
      order,
      escalate: false
    });
  }

  // OTHER → LLM fallback (optional)
  const answer = await gptFallback(message || "");
  const escalate = /not fully sure|connect you to a human/i.test(answer);
  res.json({ intent, answer, escalate });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
