import React, { useState } from "react";
import axios from "axios";

export default function DictionaryApp() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState(null);

  function handleResponse(response) {
    setResult(response.data);
  }

  function search(event) {
    event.preventDefault();
    const apiKey = "3t4b733c995f4o30695874253279af2f";
    const apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${keyword}&key=${apiKey}`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-violet-50 pt-12 px-4">
      <img
        src="https://assets.shecodes.io/images/logo.png"
        alt="SheCodes logo"
        className="h-10 mb-8"
      />

      <form onSubmit={search} className="w-full max-w-xl mb-6">
        <input
          type="search"
          onChange={handleKeywordChange}
          placeholder="What word do you want to look up?"
          className="w-full p-4 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </form>

      {result && (
        <div className="w-full max-w-3xl bg-white rounded-md shadow-md p-6 space-y-4 text-left">
          <h2 className="text-2xl font-bold">{result.word}</h2>
          {result.phonetic && (
            <p className="text-gray-500 italic">{result.phonetic}</p>
          )}

          {result.meanings.map((meaning, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">{meaning.partOfSpeech}</h3>
              <p className="text-gray-800">{meaning.definition}</p>
              {meaning.example && (
                <p className="text-gray-600 italic mt-1">"{meaning.example}"</p>
              )}
              {meaning.synonyms && meaning.synonyms.length > 0 && (
                <p className="text-sm mt-2">
                  <strong>Similar:</strong> {meaning.synonyms.join(", ")}
                </p>
              )}
            </div>
          ))}

          {result.photos && (
            <div className="grid grid-cols-3 gap-4 pt-4">
              {result.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo.src.tiny}
                  alt="Related"
                  className="w-full rounded-md object-cover"
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
