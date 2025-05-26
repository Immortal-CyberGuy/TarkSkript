import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import '../styles/Playground.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Playground() {
  const [code, setCode] = useState(
    `कार्य मुख्यः() {\n  मुद्रणम्("नमस्ते संसार!");\n}`
  );
  const [output, setOutput] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);

  const saveCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.vedaskript';
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearEditor = () => {
    setCode('');
    setOutput('');
    setStatusMessage(null);
  };

  const executeCode = async () => {
  setOutput('// Running...');
  setStatusMessage(null);

  const API_URL =
    window.location.hostname === 'localhost'
      ? 'http://localhost:4000/run'
      : 'https://tarkskript.onrender.com/run';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    const result = await response.json();
    const { programOutput, success } = result;

    setOutput(programOutput || '// (no output)');

    setStatusMessage({
      text: success
        ? '=== Code Execution Successful ==='
        : '=== Code Exited With Errors ===',
      color: success ? 'green' : 'red',
    });
  } catch (err) {
    setOutput(`Unexpected error: ${err.message}`);
    setStatusMessage({
      text: '=== Code Exited With Errors ===',
      color: 'red',
    });
  }
};


  return (
    <main className="playground-wrapper">
      <h1 className="main-heading">Playground</h1>

      <section className="playground-card">
        <header className="top">
          <div className="ide-buttons">
            <button onClick={saveCode} title="Download code" className="btn-icon">
              <i className="fa-solid fa-floppy-disk"></i>
            </button>
            <button onClick={clearEditor} title="Clear editor" className="btn-icon">
              <i className="fa-solid fa-trash"></i>
            </button>
            <button onClick={executeCode} title="Run code" className="btn-icon run-btn">
              <i className="fa-solid fa-play"></i>
            </button>
          </div>
        </header>

        <div className="editor-container">
          <MonacoEditor
            height="440px"
            language="plaintext"
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
              fontSize: 17,
              minimap: { enabled: false },
              wordWrap: 'on',
              automaticLayout: true,
              smoothScrolling: true,
              theme: 'vs-dark',
            }}
          />
        </div>

        <div className="output" role="region" aria-live="polite">
          <pre>{output}</pre>
          {statusMessage && (
            <p style={{ color: statusMessage.color, fontWeight: 'bold' }}>
              {statusMessage.text}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
