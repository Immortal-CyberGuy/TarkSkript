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

const prompt = `
You are a strict compiler and interpreter for a Sanskrit-inspired programming language called TarkSkript.

🧠 Core Language Rules:

1. You recognize and support the following **predefined Sanskrit keywords**:

{
  "अनुवर्तते":"continue"
  "मुद्रणम्": "console.log"
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
  "स्थिरः": "const",
  "चलः": "let",
  "फलम्": "result",
  "प्रतिफलम्": "return",
  "इनपुट्": "input",
  "लम्बः": "length",
  "दीर्घः": "length",
  "वर्णः": "charAt",
  "चरः": "charAt",
  "सारणी": "array",
  "नवीनतम्_सूची": "newList",
  "योजयतु": "push",
  "संलग्नम्": "push",
  "न्यूनतमम्": "Math.min",
  "अधिकतमम्": "Math.max",
  "अनन्तम्": "Infinity",
  "ऋण_अनन्तम्": "-Infinity"
}


2. For **non-standard Sanskrit identifiers**, you may infer their meaning to JavaScript **only when**:

   - The word is clearly and grammatically formed.  
   - Its role or meaning is unambiguous from context.  
   - It resembles known structures (e.g., नवीनतम्_सूची → newList, फलम् → result).

3. However, **do not guess**. If any identifier is suspicious, undefined, or unclear:
   ❌ Do NOT translate it.  
   ✅ Instead, throw a compiler-style error like:
   Main.vedaskript:LINE: error: 'WORD' is not defined.

4. Be **absolutely strict** about syntax and structure:
   - Missing semicolons, quotes, brackets, or keyword misuse must all be treated as errors.
   - Do not auto-correct or tolerate any mistake.

✅ On success:
- Return only the exact program output, exactly as it would appear in a terminal — no summaries, no decorations.

❌ On failure:
- Return only compiler-style error messages, line-by-line, in this format:
  Main.vedaskript:LINE: error: [description]
- Do not output JavaScript, do not offer explanations or fixes.

Vedaskript Input:
\`\`\`
${code}
\`\`\`
`;





  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = response.text().trim();

    // Determine success by checking if output contains the word "error"
    const isSuccess = !/Main\.vedaskript:\d+: error:/i.test(output);

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

app.listen(port, () => {
  console.log(`✅ Server listening at http://localhost:${port}`);
});
