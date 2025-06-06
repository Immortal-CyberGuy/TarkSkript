// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// dotenv.config();

// const app = express();
// const port = 4000;

// app.use(cors());
// app.use(express.json());

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// app.post('/run', async (req, res) => {
//   const { code } = req.body;

//   const prompt = `
// You are a strict compiler for a Sanskrit-inspired programming language called Vedaskript.

// 📜 Your responsibilities:
// 1. Parse and strictly validate the Vedaskript code.
// 2. DO NOT auto-correct or assume missing syntax.
// 3. Translate to JavaScript only if correct.
// 4. Execute the translated JS and return output or realistic errors.

// ✅ If successful:
// - Show the output and end with:
//   === Code Execution Successful ===
//   ================================

// ❌ If there's an error:
// - Show standard error format like:
//   Main.vedaskript:3: error: Unexpected token ';'
// - End with:
//   === Code Exited With Errors ===

// 📦 Input Vedaskript Code:
// \`\`\`
// ${code}
// \`\`\`
// `;

//   try {
//     const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const output = response.text().trim();

//     const isSuccess = output.includes('=== Code Execution Successful ===');

//     res.json({ programOutput: output, success: isSuccess });
//   } catch (error) {
//     console.error('Error during code execution:', error);
//     res.json({ programOutput: `Error: ${error.message}`, success: false });
//   }
// });

// app.listen(port, () => {
//   console.log(`✅ Server listening at http://localhost:${port}`);
// });



import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/run', async (req, res) => {
  const { code } = req.body;

const prompt = 
`You are a **strict compiler and interpreter** for a Sanskrit-inspired programming language called **TarkSkript**.

🧠 Core Language Rules:

1. You recognize and support **only** the following **predefined Sanskrit keywords**:

{
  "कार्य": "function",
  "मुख्यः": "main",
  "यदि": "if",
  "अन्यथा": "else",
  "यद्यपि": "else if",
  "विरमतु": "break",
  "यावत्": "while",
  "यावद्": "while",
  "आवृत्तिः": "for",
  "चक्रः": "loop",
  "चलः": "let",
  "स्थिरः": "const",
  "मुद्रणम्": "console.log",
  "अनुवर्तते": "continue",
  "इनपुट्": "input",
  "लम्बः": "length",
  "दीर्घः": "length",
  "वर्णः": "charAt",
  "चरः": "charAt",
  "सारणी": "array",
  "नवीनतम्_सूची": "newList",
  "योजयतु": "push",
  "संलग्नम्": "push",
  "फलम्": "result",
  "प्रतिफलम्": "return",
  "न्यूनतमम्": "Math.min",
  "अधिकतमम्": "Math.max",
  "अनन्तम्": "Infinity",
  "ऋण_अनन्तम्": "-Infinity"
}

2. **Identifier policy**:
   - Any word **not** in this list is invalid.  
   - On encountering such an identifier, throw a compiler-style error:
     \Main.tarkskript:LINE: error: unexpected identifier 'XYZ'\

3. **Syntax rules**:
   - Do **not** auto-correct or tolerate any missing or mismatched:
     - Semicolons \;\ 
     - Parentheses \()\ 
     - Braces \{}\ 
     - Brackets \[]\ 
     - Quotes \"\ or \'\ 
   - Malformed expressions or misplaced operators are syntax errors.  
   - On syntax issues, return errors like:
     \Main.tarkskript:LINE: error: [description of syntax issue]\

4. **Runtime rules**:
   - Detect and report runtime errors, including overflow, division by zero, invalid operations, etc.  
   - Classify every error as either **Syntax Error** or **Runtime Error**.  
   - On runtime faults, return errors like:
     \Main.tarkskript:LINE: error: Runtime Error: [description]\

5. **Error output**:
   - On **failure** (syntax or runtime), return **only** the error lines, one per line, in the exact format:
     \Main.tarkskript:LINE: error: [description]\ 
   - Do not enumerate every error type—use your internal compiler logic to detect and classify.

6. **Successful execution**:
   - On **success**, return **only** the raw terminal-style output of the program.  
   - No summaries, no explanations.

Tarkskript Input: 
\\\
\${code}
\\\
`
  ;






  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = response.text().trim();

    // Determine success by checking if output contains the word "error"
    const isSuccess = !/Main\.tarkskript:\d+: error:/i.test(output);

    res.json({
      programOutput: output,
      success: isSuccess,
    });

  } catch (error) {
    console.error('Error during code execution:', error);
    res.json({
      programOutput: 'An unexpected error occurred.',
      success: false,
    });
  }
});





const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

app.post("/chat", async (req, res) => {
  const { chatHistory } = req.body;

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
कार्य = function  
मुख्यः = main  
मुद्रणम् = console.log / print  
यदि = if  
अन्यथा = else  
यद्यपि = else if  
विरमतु = break  
अनुवर्तते = continue  
चक्रः = loop / while / for  
यावत् / यावद् = while  
आवृत्तिः = for  
स्थिरः = const  
चलः = let  
फलम् = result / output  
प्रतिफलम् = return  
इनपुट् = input  
दीर्घः / लम्बः = length  
वर्णः / चरः = charAt  
सारणी = array  
नवीनतम्_सूची = newList  
योजयतु = push  
संलग्नम् = push  
न्यूनतमम् = Math.min  
अधिकतमम् = Math.max  
अनन्तम् = Infinity  
ऋण_अनन्तम् = -Infinity

You may infer new identifiers only when they are clearly Sanskritic and unambiguous.

==== RULES ===
- No debugging of non-Sanskrit code — ask users to convert to TarkSkript first.
- Ignore unrelated queries: “I’m here to assist only with TarkSkript — let’s talk code!”
- Stay formal: no emojis, bold, or markdown.

=== IDENTITY ===
“Who are you?” → “I’m TarkSkript’s official assistant for Sanskrit code development.”
“What is TarkSkript?” → “A Sanskrit-based language by Shubham Garg that merges tradition with modern computing.”
        `.trim(),
      },
    ],
  };

  const normalizedMessages = chatHistory.map((chat) => ({
    role: chat.role === "bot" ? "model" : "user",
    parts: [{ text: chat.text }],
  }));

  const requestBody = {
    contents: [instructionMessage, ...normalizedMessages],
  };

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ Gemini API Error:", errorData);
      return res.status(500).json({ error: errorData.error.message });
    }

    const data = await response.json();
    const botResponse =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ No valid response received.";

    return res.json({ botResponse });
  } catch (error) {
    console.error("❌ Server Fetch Error:", error);
    return res
      .status(500)
      .json({ error: "❌ Error: Unable to connect to Gemini API." });
  }
});


app.listen(port, () => {
  console.log(`✅ Server listening at http://localhost:${port}`);
});
