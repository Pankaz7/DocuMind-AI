const API_URL = "https://documind-ai-f3ax.onrender.com";
// Button click + Enter key
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("sendBtn").addEventListener("click", sendMessage);

  document.getElementById("userInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
});

// Add message
function addMessage(text, type) {
  const chatBox = document.getElementById("chatBox");

  const msg = document.createElement("div");
  msg.classList.add("message", type);
  msg.innerText = text;

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Send message
async function sendMessage() {
  const input = document.getElementById("userInput");
  const question = input.value.trim();

  if (!question) return;

  addMessage(question, "user");
  input.value = "";

  // typing
  addMessage("Typing...", "bot");

  try {
    const res = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question })
    });

    const data = await res.json();

    // remove typing
    document.querySelector(".bot:last-child").remove();

    addMessage(data.answer || data.detail || "Error", "bot");

  } catch (err) {
    console.error(err);
  }
}