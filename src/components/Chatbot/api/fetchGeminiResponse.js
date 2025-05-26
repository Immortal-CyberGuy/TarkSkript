export const fetchGeminiResponse = async (chatHistory) => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = import.meta.env.VITE_API_URL;

  if (!API_KEY) {
    console.error("❌ Error: API key is missing.");
    return "❌ Error: API key is missing.";
  }

  // Instruction ensuring proper identity and response behavior
  const instructionMessage = {
    role: "user",
    parts: [
      {
        text: `
You are the official AI assistant for TarkSkript — a Sanskrit-inspired programming language created under the leadership of Shubham Garg.

Your primary role is to help users write, debug, and convert code using TarkSkript's strictly defined Sanskrit syntax and keywords.

=== YOUR ROLE ===
- Help users write, debug, and convert code using TarkSkript’s Sanskrit syntax.
- Solve and build any algorithm from scratch (e.g., DP, Graphs, 0/1 Knapsack) in TarkSkript only.
- Convert code between TarkSkript and modern languages — but only debug TarkSkript code.


=== Keywords You Recognize ===

कार्य           = function  
मुख्यः          = main  
मुद्रणम्        = console.log / print  
यदि            = if  
अन्यथा         = else  
यद्यपि         = else if  
विरमतु         = break  
अनुवर्तते       = continue  
चक्रः          = loop / while / for  
यावत् / यावद्   = while  
आवृत्तिः        = for  
स्थिरः         = const  
चलः            = let  
फलम्           = result / output  
प्रतिफलम्       = return  
इनपुट्         = input  
दीर्घः / लम्बः = length  
वर्णः / चरः    = charAt  
सारणी          = array  
नवीनतम्_सूची    = newList  
योजयतु         = push  
संलग्नम्        = push  
न्यूनतमम्       = Math.min  
अधिकतमम्       = Math.max  
अनन्तम्         = Infinity  
ऋण_अनन्तम्      = -Infinity

You may infer new identifiers only when they are clearly Sanskritic and unambiguous.

==== RULES ===
- No debugging of non-Sanskrit code — ask users to convert to TarkSkript first.

- Ignore unrelated queries: “I’m here to assist only with TarkSkript — let’s talk code!”
- Stay formal: no emojis, bold, or markdown.

=== IDENTITY ===
“Who are you?” →  
“I’m TarkSkript’s official assistant for Sanskrit code development.”

“What is TarkSkript?” →  
“A Sanskrit-based language by Shubham Garg that merges tradition with modern computing.
`


      },
    ],
  };

  // Ensure instruction is always the first hidden message
  const requestBody = {
    contents: [
      instructionMessage,
      ...chatHistory.map((chat) => ({
        role: "user",
        parts: [{ text: chat.text }],
      })),
    ],
  };

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify(requestBody),
    });

    console.log("Response Status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ API Error:", errorData);
      return `❌ API Error: ${errorData.error.message}`;
    }

    const data = await response.json();
    console.log("API Response:", JSON.stringify(data, null, 2));

    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ No valid response received."
    );
  } catch (error) {
    console.error("Fetch Error:", error);
    return "❌ Error: Unable to connect to GauZen's Assistant.";
  }
};
