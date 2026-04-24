import { useState, useEffect, useCallback } from "react";

export default function Generator() {

  // ✅ useEffect (component load)
  useEffect(() => {
    console.log("Generator page loaded");
  }, []);

  const [text, setText] = useState("");
  const [length, setLength] = useState(12);
  const [copied, setCopied] = useState(false);

  const [uppercase, setUppercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);

  // ✅ useCallback added
  const generateText = useCallback(() => {
    let chars = "abcdefghijklmnopqrstuvwxyz";

    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+";

    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }

    setText(result);
  }, [length, uppercase, numbers, symbols]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white px-4 py-10">

      {/* 🔥 Hero Section */}
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
          ⚡ Smart Password Generator
        </h1>

        <p className="text-gray-300 max-w-xl mx-auto">
          Generate secure, strong and customizable passwords instantly.
          Perfect for protecting your accounts with modern encryption-ready strings.
        </p>

        {/* Features */}
        <div className="flex justify-center gap-6 mt-6 flex-wrap text-sm text-gray-400">
          <span>🔒 Secure</span>
          <span>⚡ Instant</span>
          <span>🎯 Customizable</span>
          <span>📱 Mobile Friendly</span>
        </div>
      </div>

      {/* 🔥 Main Card */}
      <div className="max-w-md mx-auto bg-slate-800/90 border border-white/10 rounded-xl p-6 shadow-lg backdrop-blur">

        {/* Output */}
        <div className="bg-black/40 p-3 rounded mb-4 break-all text-cyan-300">
          {text || "Generated password will appear here..."}
        </div>

        {/* Length */}
        <label className="block mb-2 text-sm text-gray-300">
          Length: {length}
        </label>
        <input
          type="range"
          min="6"
          max="30"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))} // ✅ FIX
          className="w-full mb-4"
        />

        {/* Options */}
        <div className="space-y-2 mb-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={uppercase} onChange={() => setUppercase(!uppercase)} />
            🔤 Include Uppercase
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={numbers} onChange={() => setNumbers(!numbers)} />
            🔢 Include Numbers
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={symbols} onChange={() => setSymbols(!symbols)} />
            💠 Include Symbols
          </label>
        </div>

        {/* Buttons */}
        <button
          onClick={generateText}
          className="w-full bg-cyan-500 hover:bg-cyan-600 py-2 rounded mb-2 transition font-semibold"
        >
          🚀 Generate Password
        </button>

        {text && (
          <button
            onClick={handleCopy}
            className="w-full border border-cyan-400 py-2 rounded hover:bg-cyan-400/10 transition"
          >
            {copied ? "✅ Copied!" : "📋 Copy"}
          </button>
        )}
      </div>

      {/* 🔥 Extra Info */}
      <div className="max-w-4xl mx-auto mt-12 text-center text-gray-400 text-sm">
        <p>
          Strong passwords are essential for protecting your digital identity.
          Avoid using common words and always prefer a mix of characters.
        </p>

        <p className="mt-3">
          This tool helps you generate unpredictable and secure passwords in seconds.
          Use it for emails, social media, banking, and more.
        </p>
      </div>

      {/* 🔥 Footer */}
      <footer className="mt-12 text-center text-gray-500 text-xs">
        <p>⚡ Built for speed • 🔒 Privacy first • 🎯 Simple UI</p>
      </footer>
    </div>
  );
}