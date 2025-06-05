import React, { useState } from "react";
import axios from "axios";
import { FaPlay, FaSpinner, FaCopy, FaCheck } from "react-icons/fa";

export default function OnlineCompiler() {
  const [code, setCode] = useState("// Write your code here");
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const languages = {
    cpp: 54,
    python: 71,
    javascript: 63,
  };

  const handleRun = async () => {
    setLoading(true);
    try {
      const { data: submission } = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false&fields=*",
        {
          source_code: btoa(code),
          language_id: languages[language],
          stdin: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": "ca5decee47msh62698f28c5ff71ep1c5eebjsn4018920f0df8",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      );

      const token = submission.token;

      const interval = setInterval(async () => {
        const res = await axios.get(
          `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true&fields=*`,
          {
            headers: {
              "X-RapidAPI-Key": "ca5decee47msh62698f28c5ff71ep1c5eebjsn4018920f0df8",
              "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            },
          }
        );

        if (res.data.status.id >= 3) {
          clearInterval(interval);
          setOutput(
            atob(res.data.stdout || res.data.stderr || res.data.compile_output || "No Output")
          );
          setLoading(false);
        }
      }, 2000);
    } catch (err) {
      console.error(err);
      setOutput("Error occurred while running the code.");
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col gap-4">
        <select
          className="p-2 rounded bg-gray-700 border border-gray-600 text-white"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>
        <textarea
          className="w-full h-80 p-4 bg-gray-800 border border-gray-700 rounded resize-none text-sm font-mono text-white"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>
        <button
          onClick={handleRun}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white p-2 rounded shadow-md"
        >
          {loading ? <FaSpinner className="animate-spin" /> : <FaPlay />} Run Code
        </button>
      </div>

      <div className="relative bg-gray-900 border border-gray-700 p-4 rounded shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Output</h2>
          <button
            onClick={handleCopy}
            className="text-sm flex items-center gap-1 hover:text-green-400"
          >
            {copied ? <FaCheck /> : <FaCopy />} {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="whitespace-pre-wrap text-sm text-green-300 font-mono overflow-y-auto h-80">
          {output || (loading && "Running...") || "Run code to see output here"}
        </pre>
      </div>
    </div>
  );
}
