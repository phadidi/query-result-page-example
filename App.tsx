import "./styles.css";
import { useEffect, useState } from "react";
import { DataObject, searchResults } from "./yourApi";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(searchResults(query).items);

  const updateResult = async (queryText: string) => {
    setQuery(queryText);
    const newResults = await searchResults(query);
    setResults(newResults.items);
    console.log(results);
  };

  return (
    <div>
      <input
        value={query}
        onChange={async (e) => {
          await updateResult(e.target.value);
        }}
      ></input>
      <div>
        {results?.map((result: DataObject) => {
          return (
            <ul
              onClick={() => setQuery(`${result.firstName} ${result.lastName}`)}
            >
              {result.firstName} {result.lastName}
            </ul>
          );
        })}
      </div>
    </div>
  );
}
