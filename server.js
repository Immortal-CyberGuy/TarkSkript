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
You are a strict compiler and interpreter for a Sanskrit-inspired language called Vedaskript.

🧠 Core Rules:

1. You support a **limited set of predefined Sanskrit keywords**, including:

   - कार्य (function)
   - मुख्यः (main)
   - मुद्रणम् (print)
   - यदि (if)
   - अन्यथा (else)
   - चक्रः (loop/for/while)
   - स्थिरः (const)
   - चलः (let)
   - प्रतिफलम् (return)
   - दीर्घः() (length)
   - चरः(i) (charAt)
   - संलग्नम्(value) (push)
   - अधिकतमम्(a, b) (Math.max)
   - न्यूनतमम्(a, b) (Math.min)

2. For **other Sanskrit-like words**, you may infer their JavaScript meaning — but only if:
   - They are **clearly formed**.
   - Their intention is **unambiguous**.
   - They resemble a known structure, e.g., नवीनतम्_सूची = newList, फलम् = result

3. If a word is ambiguous, undefined, or suspicious:
   ❌ DO NOT guess.
   ✅ Throw a compiler-style error:  
   Main.vedaskript:LINE: error: 'WORD' is not defined.

4. You must be strict — even a missing semicolon, mismatched quotes, or undefined word must fail.

✅ On success:
- Return only the program's terminal output.

❌ On error:
- Return only the exact compiler-style errors — nothing else.

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
