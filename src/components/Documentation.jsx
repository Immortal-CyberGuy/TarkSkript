import React from 'react';
import '../styles/Documentation.css';

const examples = [
  {
    title: 'General Code Structure',
    desc: 'This is the general structure of a program in the Sanskrit-based programming language. It includes the main function and basic code structure.',
    code: `कार्य मुख्यः() {\n}`,
  },
  {
    title: 'Variable Declaration',
    desc: 'Declare a variable using चरः keyword and assign a numerical value.',
    code: `चरः संख्या = 10;`,
  },
  {
    title: 'Function Definition',
    desc: 'Define a function using कार्य keyword and use प्रतिददाति for return.',
    code: `कार्य योग(अ, ब) {\n  प्रतिददाति अ + ब;\n}`,
  },
  {
    title: 'Data Types',
    desc: 'Working with integers, floats, strings, booleans, and null.',
    code: `चरः संख्या = 10;  // Integer\nचरः मूल्य = 10.5;  // Float\nचरः नाम = "राज";  // String\nचरः सत्य = सत्य;  // Boolean\nचरः अज्ञात = रिक्त;  // Null`,
  },
  {
    title: 'If-Else Statement',
    desc: 'Use यदि and अन्यथा keywords for branching.',
    code: `यदि (संख्या > 5) {\n  मुद्रणम्("संख्या बड़ी है");\n} अन्यथा {\n  मुद्रणम्("संख्या छोटी है");\n}`,
  },
  {
    title: 'While Loop',
    desc: 'Repeat using यावद् keyword as long as condition is true.',
    code: `यावद्‌ (संख्या < 5) {\n  संख्या = संख्या + 1;\n  मुद्रणम्(संख्या);\n}`,
  },
  {
    title: 'Return Statement',
    desc: 'The प्रतिददाति keyword is used to return a value from a function in this example.',
    code: `कार्य परिणामम्() {\n\tप्रतिददाति 10;\n}`,
  },
  {
    title: 'Break Statement',
    desc: 'Exit loop prematurely using विरमतु.',
    code: `यावद्‌ (संख्या < 10) {\n  यदि (संख्या == 5) {\n    विरमतु;\n  }\n  मुद्रणम्(संख्या);\n}`,
  },
  {
    title: 'Continue Statement',
    desc: 'Skip to next iteration using अनुवर्तते.',
    code: `यावद्‌ (संख्या < 10) {\n  यदि (संख्या == 5) {\n    अनुवर्तते;\n  }\n  मुद्रणम्(संख्या);\n}`,
  },
  {
    title: 'Inbuilt Print Function',
    desc: 'Use मुद्रणम् to print values to console.',
    code: `कार्य मुख्यः() {\n  मुद्रणम्("नमस्ते संसार!");\n}`,
  },
];

function Documentation() {
  return (
    <section className="documentation">
      <h2>Documentation</h2>
      <p className="doc-desc">
        <strong>Vedaskript</strong> is a unique programming language inspired by the ancient language of Sanskrit, seamlessly blending tradition with modern programming concepts.
      </p>
      <div className="doc-blocks">
        {examples.map((ex, i) => (
          <div className="doc-block" key={i}>
            <h3>{ex.title}</h3>
            <p className="block-desc">{ex.desc}</p>
            <div className="code-container">
              <pre className="language-vedaskript"><code>{ex.code}</code></pre>
              <div className="copy-code" onClick={() => navigator.clipboard.writeText(ex.code)}>
                <i className="fa-solid fa-copy"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Documentation;
