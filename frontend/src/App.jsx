import { useEffect, useState } from "react";
import ClothingBrowser from "./ClothingBrowser.jsx";

function App() {
  const [message, setMessage] = useState("Loading message...");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setMessage(data.message))
      .catch((err) => {
        console.error(err);
        setError("Could not reach the API. Is Flask running?");
      });
  }, []);

    return (
        <div>
            <h1>Clothing Demo</h1>
            <ClothingBrowser />
        </div>
    );
}

export default App;
