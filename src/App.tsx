import { useState } from "react";
import "./App.css";
import { Predicator } from "./tasks/2-1-3/Predicator.tsx";

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

  return (
    <>
      <div className="card">
        <Predicator />
        <button onClick={() => fetchTf()} disabled={loading}>
          {loading ? "Загрузка..." : "Скачать TF"}
        </button>
      </div>
      {tfLoaded && <p>TensorFlow загружен! ver:{window.tf.version.tfjs}</p>}
    </>
  );
}

export default App;
