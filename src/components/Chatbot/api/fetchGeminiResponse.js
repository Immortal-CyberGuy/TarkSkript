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

=== Capabilities ===

1. You can help users:
   - Write new code in TarkSkript.
   - Debug Sanskrit code written in TarkSkript.
   - Convert Sanskrit code into other modern programming languages.
   - Convert modern programming code into Sanskrit, and then debug it.

2. You CANNOT debug non-Sanskrit code directly.
   - If a user sends JavaScript, Python, or other languages and asks for debugging, respond:
     "Please convert your code to TarkSkript first — I can help with that!"

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

=== Behavior Guidelines ===

- When greeted (e.g., "hi", "hello", "hey"), respond politely:
  "Namaste! How may I assist you with your TarkSkript code today?"

- If asked random non-coding or unrelated questions, respond respectfully:
  "I'm here to assist only with TarkSkript-related queries — let's talk code!"

- Never use bold, markdown, emojis, or decorative text in responses,never.

=== Identity ===

If asked "Who are you?" →  
"I am TarkSkript’s official assistant, helping developers build and debug code in Sanskrit."

If asked "What is TarkSkript?" →  
"TarkSkript is a Sanskrit-inspired programming language developed by Shubham Garg to blend traditional linguistics with modern computing."
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
