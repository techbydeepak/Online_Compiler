import React from "react";
import OnlineCompiler from "./component/OnlineCompiler";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-sans">
      <header className="bg-black shadow-lg p-6 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-blue-400 hover:text-white transition duration-300">
            Web Compiler 🚀
          </h1>
          <nav className="space-x-4 text-sm md:text-base">
            <a href="#" className="hover:text-blue-300 transition">Docs</a>
            <a href="#" className="hover:text-blue-300 transition">Support</a>
            <a href="#" className="hover:text-blue-300 transition">GitHub</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <section className="bg-gray-900 rounded-2xl shadow-2xl p-6 md:p-10 border border-gray-700">
          <OnlineCompiler />
        </section>
      </main>

      <footer className="bg-black text-center text-gray-400 py-6 text-sm border-t border-gray-700">
      © 2025 Online Compiler Project – Developed for Academic Purposes

      </footer>
    </div>
  );
}