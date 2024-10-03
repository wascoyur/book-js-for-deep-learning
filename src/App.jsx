import "./App.css";
import { Predicator } from "./tasks/2-1-3/Predicator.jsx";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [tfLoaded, setTfLoaded] = useState(false);

  const fetchTf = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js",
      );
      const scriptText = await response.text();
      const scriptElement = document.createElement("script");
      scriptElement.text = scriptText;
      document.head.appendChild(scriptElement);
      setTfLoaded(true);
    } catch (error) {
      console.error("Ошибка загрузки TensorFlow:", error);
    } finally {
      setLoading(false);
    }

    setLoading(false);
  };

  useEffect(() => {}, []);

  return (
    <>
      <Predicator />
      <button onClick={() => fetchTf()} disabled={loading}>
        {loading ? "Загрузка..." : "Скачать TF"}
      </button>
      {tfLoaded && <p>TensorFlow загружен!</p>}
    </>
  );
}

export default App;
