import data from "../data/orders.json" with { type: "json" };

export function findOrder({ orderId, email, phone }) {
  const id = (orderId || "").trim();
  const em = (email || "").trim().toLowerCase();
  const ph = (phone || "").trim();
  return data.find(o =>
    (id && o.orderId === id) ||
    (em && o.email.toLowerCase() === em) ||
    (ph && o.phone === ph)
  ) || null;
}
