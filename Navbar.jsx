import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <style>{`
        .nav-glass {
          backdrop-filter: blur(10px);
          background: rgba(15, 23, 42, 0.7);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .nav-link {
          position: relative;
          padding: 6px 12px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .nav-link:hover {
          color: #22d3ee;
          background: rgba(6,182,212,0.1);
        }

        .active-link {
          color: #22d3ee;
        }

        .active-link::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          height: 2px;
          width: 100%;
          background: linear-gradient(to right, #22d3ee, #6366f1);
          border-radius: 10px;
        }

        .mobile-menu {
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <nav className="nav-glass sticky top-0 z-50 px-6 py-3 flex items-center justify-between text-white">

        {/* 🔥 Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-cyan-400 to-indigo-500 p-2 rounded-lg shadow-lg">
            🌐
          </div>
          <h1 className="text-lg font-bold tracking-wide">LinguaAI</h1>
        </div>

        {/* 🖥 Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-link" : ""}`
            }
          >
            Translator
          </NavLink>

          <NavLink
            to="/generator"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-link" : ""}`
            }
          >
            Generator
          </NavLink>
        </div>

        {/* 📱 Mobile Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl focus:outline-none"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </nav>

      {/* 📱 Mobile Dropdown */}
      {isOpen && (
        <div className="mobile-menu md:hidden px-6 py-4 bg-slate-900 text-white space-y-4 border-b border-white/10">

          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block nav-link ${isActive ? "active-link" : ""}`
            }
          >
            Translator
          </NavLink>

          <NavLink
            to="/generator"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block nav-link ${isActive ? "active-link" : ""}`
            }
          >
            Generator
          </NavLink>
        </div>
      )}
    </>
  );
}