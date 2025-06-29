import React, { useState } from "react";

const DictionaryApp = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const search = async () => {
    if (!query) return;

    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`);
      if (!res.ok) throw new Error("Word not found");

      const data = await res.json();
      setResult(data[0]);
      setError("");
    } catch (err) {
      setResult(null);
      setError("Слово не найдено 😢");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-4">Dictionary</h1>

      <div className="flex gap-2">
        <input
          type="text"
          className="border px-4 py-2 rounded w-full"
          placeholder="Введите слово..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={search}
        >
          Найти
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h2 className="text-2xl font-semibold">{result.word}</h2>
          {result.meanings.map((meaning, idx) => (
            <div key={idx} className="mt-2">
              <p className="italic text-sm text-gray-600">{meaning.partOfSpeech}</p>
              <ul className="list-disc list-inside">
                {meaning.definitions.map((def, i) => (
                  <li key={i}>
                    {def.definition}
                    {def.example && (
                      <div className="text-sm text-gray-500">Например: "{def.example}"</div>
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
