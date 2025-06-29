import React, { useState } from "react";

const DictionaryApp = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const search = async () => {
    if (!query) return;

    try {
      const apiKey = "3t4b733c995f4o30695874253279af2f";
      const response = await fetch(
        `https://api.shecodes.io/dictionary/v1/define?word=${query}&key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Word not found");
      }

      const data = await response.json();
      setResult(data);
      setError("");
    } catch (err) {
      setResult(null);
      setError("Слово не найдено 😢");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center">📖 Dictionary</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border px-4 py-2 rounded w-full"
          placeholder="Enter a word..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={search}
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {result && (
        <div className="mt-6 bg-gray-50 p-4 rounded shadow">
          <h2 className="text-2xl font-semibold mb-2">{result.word}</h2>

          {result.meanings.map((meaning, index) => (
            <div key={index} className="mb-4">
              <p className="text-sm italic text-gray-700 mb-1">
                {meaning.partOfSpeech}
              </p>
              <ul className="list-disc list-inside text-gray-800">
                {meaning.definitions.map((def, i) => (
                  <li key={i}>
                    {def.definition}
                    {def.example && (
                      <p className="text-sm text-gray-500">
                        Example: "{def.example}"
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DictionaryApp;