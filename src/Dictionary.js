import React, { useState } from "react";
import axios from "axios";
import Photos from "./Photos";
import "./Dictionary.css";
import Results from "./Results";

export default function Dictionary() {
  let [keyword, setKeyword] = useState("");
  let [results, setResults] = useState(null);
  let [photos, setPhotos] = useState(null);

  function handleDictionaryResponse(response) {
    setResults(response.data[0]);
  }

  function handlePexelsResponse(response) {
    setPhotos(response.data.photos);
  }

  function search(event) {
    event.preventDefault();
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
    let pexelsApiKey =
      "563492ad6f9170000100000104ae2f8764ca4043a2d14cf3fd119145";
    let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=3`;
    let headers = { Authorization: `Bearer ${pexelsApiKey}` };

    axios.get(pexelsApiUrl, { headers: headers }).then(handlePexelsResponse);
    axios.get(apiUrl).then(handleDictionaryResponse);
  }
  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }
  return (
    <div className="Dictionary">
      <section>
        <h2>Look up a word, any word...</h2>
        <form onSubmit={search}>
          <input type="search" onChange={handleKeywordChange} />
        </form>
        <Results results={results} />
        <Photos photos={photos} />
      </section>
    </div>
  );
}
