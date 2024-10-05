import { useState } from "react";
import s from "./TfFetcher.module.css";
import classNames from "classnames";

export const TfFetcher = () => {
  const [, setLoading] = useState(false);
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
    <div className={s.root}>
      <div
        className={classNames(s.button, tfLoaded && s.loaded)}
        onClick={() => fetchTf()}
      />
      {tfLoaded ? (
        <div className={s.note}>TF ver: {tf.version.tfjs}</div>
      ) : (
        <div className={s.note}>TF not loaded</div>
      )}
    </div>
  );
};
