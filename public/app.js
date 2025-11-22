const chat = document.getElementById("chat");
const msg = document.getElementById("msg");
const oid = document.getElementById("oid");
const em  = document.getElementById("em");
const ph  = document.getElementById("ph");
const sendBtn = document.getElementById("send");

function addBubble(text, from="bot"){
  const d = document.createElement("div");
  d.className = from === "user" ? "u" : "b";
  d.textContent = text;
  chat.appendChild(d);
  chat.scrollTop = chat.scrollHeight;
}

async function send(){
  const text = msg.value.trim();
  if(!text) return;
  addBubble(text, "user");
  msg.value = "";

  const res = await fetch("/api/chat", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      message: text,
      orderId: oid.value,
      email: em.value,
      phone: ph.value
    })
  });
  const data = await res.json();
  addBubble(data.answer || "…");
}

sendBtn.onclick = send;
msg.addEventListener("keydown", e => { if(e.key==="Enter") send(); });
