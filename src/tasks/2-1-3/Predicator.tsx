import { Header } from "../../common/Header/Header.tsx";
import { testData, trainData } from "../../assets/predicatorData.ts";
import { useState } from "react";
import * as tf from "@tensorflow/tfjs";

export const Predicator = () => {
  const [trainnTensors, setTrainnTensors] = useState<
    typeof trainData | undefined
  >();
  const [testtTensors, setTesttTensors] = useState<
    typeof trainData | undefined
  >();

  function getTrainTensors() {
    const trainTensors = {
      sizeMB: tf.tensor2d(trainData.sizeMB, [20, 1]),
      timeSec: tf.tensor2d(trainData.timeSec, [20, 1]),
    };
    return trainTensors;
  }

  function getTestTensors() {
    const testTensors = {
      sizeMB: tf.tensor2d(testData.sizeMB, [20, 1]),
      timeSec: tf.tensor2d(testData.timeSec, [20, 1]),
    };
    return testTensors;
  }

  const handleClick = () => {
    setTrainnTensors(getTrainTensors());
    setTesttTensors(getTestTensors());
  };

  const linearModel = () => {
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [1], units: 1 }));
  };

  return (
    <div>
      <Header />
      <h2>Predicator</h2>
      <button onClick={handleClick}>compute</button>
    </div>
  );
};
