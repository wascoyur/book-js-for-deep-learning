import { useState } from "react";

declare global {
  interface Window {
    tf: {
      version: {
        tfjs: string;
      };
    };
  }
}

export const TfFetcher = () => {
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
      <button onClick={() => fetchTf()} disabled={loading}>
        {loading ? "Загрузка..." : "Скачать TF"}
      </button>
      {tfLoaded && <p>TensorFlow загружен! ver: {window.tf.version.tfjs}</p>}
    </>
  );
};
