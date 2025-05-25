const { VM } = require('vm2');

const SANSKRIT_TO_JS = {
  'कार्य': 'function',
  'मुख्यः': 'main',
  'मुद्रणम्': 'console.log',
  'यदि': 'if',
  'अन्यथा': 'else',
  'तदा': '{',
  'समाप्तः': '}',
  'ध्वनि': 'return',
  'परम्': 'let',
  'यदा': 'while',
  'द्विधा': 'else if',
  // add more keywords here if needed
};

// Step 1: Replace all Sanskrit keywords with JS equivalents (with word boundaries)
function replaceKeywords(code) {
  for (const [key, val] of Object.entries(SANSKRIT_TO_JS)) {
    const regex = new RegExp(`\\b${key}\\b`, 'g');
    code = code.replace(regex, val);
  }
  return code;
}

// Step 2: Replace remaining Devanagari identifiers (not JS keywords) with var1, var2...
function replaceIdentifiers(code) {
  // Regex to match Sanskrit words (Devanagari letters + optional digits/underscore)
  const identifierRegex = /[\u0900-\u097F][\u0900-\u097F0-9_]*/g;

  const seen = new Map();
  let counter = 0;

  // Collect all JS keywords values to skip replacing those as identifiers
  const jsKeywords = new Set(Object.values(SANSKRIT_TO_JS));

  return code.replace(identifierRegex, (match) => {
    if (jsKeywords.has(match)) {
      // This is a JS keyword already replaced, do not replace again
      return match;
    }
    if (!seen.has(match)) {
      counter++;
      seen.set(match, `var${counter}`);
    }
    return seen.get(match);
  });
}

function translateSanskritToJS(code) {
  code = replaceKeywords(code);
  code = replaceIdentifiers(code);
  return code;
}

function processSanskritCode(code) {
  const translated = translateSanskritToJS(code);

  console.log('--- Translated JavaScript code ---');
  console.log(translated);
  console.log('---------------------------------');

  let output = '';
  const vm = new VM({
    timeout: 1000,
    sandbox: {
      console: {
        log: (...args) => {
          output += args.join(' ') + '\n';
        },
      },
    },
  });

  try {
    vm.run(translated);
    vm.run('if(typeof main === "function") main();');
    return { programOutput: output || '// (no output)' };
  } catch (err) {
    return { error: `Error during execution: ${err.message}` };
  }
}

module.exports = { processSanskritCode };
