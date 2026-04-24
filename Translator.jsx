import { useState } from "react";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Spanish", flag: "🇪🇸" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "de", label: "German", flag: "🇩🇪" },
  { code: "it", label: "Italian", flag: "🇮🇹" },
  { code: "pt", label: "Portuguese", flag: "🇵🇹" },
  { code: "ru", label: "Russian", flag: "🇷🇺" },
  { code: "ja", label: "Japanese", flag: "🇯🇵" },
  { code: "zh", label: "Chinese", flag: "🇨🇳" },
  { code: "ko", label: "Korean", flag: "🇰🇷" },
  { code: "ar", label: "Arabic", flag: "🇸🇦" },
  { code: "hi", label: "Hindi", flag: "🇮🇳" },
  { code: "tr", label: "Turkish", flag: "🇹🇷" },
  { code: "nl", label: "Dutch", flag: "🇳🇱" },
  { code: "pl", label: "Polish", flag: "🇵🇱" },
  { code: "sv", label: "Swedish", flag: "🇸🇪" },
  { code: "da", label: "Danish", flag: "🇩🇰" },
  { code: "el", label: "Greek", flag: "🇬🇷" },
  { code: "he", label: "Hebrew", flag: "🇮🇱" },
  { code: "th", label: "Thai", flag: "🇹🇭" },
  { code: "vi", label: "Vietnamese", flag: "🇻🇳" },
  { code: "id", label: "Indonesian", flag: "🇮🇩" },
  { code: "bn", label: "Bengali", flag: "🇧🇩" },
  { code: "ur", label: "Urdu", flag: "🇵🇰" },
];

export default function Translator() {
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("hi");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);

  const translate = async () => {
    if (!inputText) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          inputText
        )}&langpair=${sourceLang}|${targetLang}`
      );

      const data = await res.json();
      setOutputText(data.responseData.translatedText);
    } catch {
      setOutputText("❌ Error");
    }

    setLoading(false);
  };

  const swapLang = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInputText(outputText);
    setOutputText(inputText);
  };

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-[#0f172a] via-[#0c1a3a] to-[#1e1b4b] relative overflow-hidden">

      {/* 🔥 Floating blobs */}
      <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl top-[-100px] left-[-100px] animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl bottom-[-80px] right-[-80px] animate-pulse"></div>

      {/* HEADER */}
      <header className="flex justify-between items-center p-5 border-b border-white/10 backdrop-blur-md">
        <h1 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
          🌐 LinguaAI
        </h1>
        <span className="text-xs text-cyan-300 border px-3 py-1 rounded-full border-cyan-400/30">
          Free Translator
        </span>
      </header>

      {/* HERO */}
      <div className="text-center mt-10 px-4">
        <h2 className="text-4xl font-bold mb-3">
          Break Language Barriers 🌍
        </h2>
        <p className="text-gray-300 max-w-xl mx-auto">
          Instantly translate text into multiple languages with a fast and
          modern AI-powered translator. Simple, clean, and powerful.
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="flex justify-center mt-10 px-4">
        <div className="w-full max-w-4xl bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/10">

          {/* Language */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">

            <select
              className="p-2 rounded bg-slate-700"
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.label}
                </option>
              ))}
            </select>

            <button
              onClick={swapLang}
              className="px-4 py-2 bg-cyan-500 rounded hover:bg-cyan-400 transition transform hover:rotate-180"
            >
              ⇄
            </button>

            <select
              className="p-2 rounded bg-slate-700"
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.label}
                </option>
              ))}
            </select>
          </div>

          {/* Input Output */}
          <div className="grid md:grid-cols-2 gap-4">

            <textarea
              className="p-3 rounded bg-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Enter text..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />

            <div className="p-3 rounded bg-slate-700 min-h-[120px]">
              {loading ? "⏳ Translating..." : outputText || "Result here..."}
            </div>
          </div>

          {/* Button */}
          <button
            onClick={translate}
            className="mt-5 w-full py-2 rounded bg-cyan-500 hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/30"
          >
            Translate 🚀
          </button>

        </div>
      </div>

      {/* EXTRA CONTENT */}
      <div className="text-center mt-12 px-4">
        <p className="text-gray-400 max-w-2xl mx-auto">
          This translator helps you communicate globally with ease. Whether
          you're learning a language or chatting with someone abroad — we've got
          you covered.
        </p>
      </div>

      {/* FOOTER */}
      <footer className="mt-16 text-center border-t border-white/10 py-6 text-gray-400 text-sm">
        <p>⚡ Powered by MyMemory And RapidApi API</p>
        <p className="mt-2">🚀 Built with React + Tailwind</p>
        <p className="mt-2 text-cyan-400">Made by Vaibhav Singh..</p>
      </footer>
    </div>
  );
}