// ✅ FRONTEND
export const fetchGeminiResponse = async (chatHistory) => {
  try {
    const response = await fetch("http://localhost:4000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatHistory }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ API Error:", errorData);
      return `❌ API Error: ${errorData.error}`;
    }

    const data = await response.json();
    return data.botResponse || "⚠️ No valid response received.";
  } catch (error) {
    console.error("Fetch Error:", error);
    return "❌ Error: Unable to connect to server.";
  }
};
