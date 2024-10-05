import { Header } from "../../common/Header/Header.tsx";
import { testData, trainData } from "../../assets/predicatorData.ts";
import { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { Spinner } from "../../common/Spinner/Spinner.tsx";
import s from "./Predictor.module.css";
import classNames from "classnames";

interface TrainTensors {
  sizeMB: tf.Tensor;
  timeSec: tf.Tensor;
}

interface TestTensors {
  sizeMB: tf.Tensor;
  timeSec: tf.Tensor;
}

export const Predicator = () => {
  const [trainnTensors, setTrainnTensors] = useState<
    TrainTensors | undefined
  >();
  const [testtTensors, setTesttTensors] = useState<TestTensors | undefined>();
  const [isCompute, setIsCompute] = useState(false);

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
    const train = getTrainTensors();
    const test = getTestTensors();
    setTrainnTensors(train);
    setTesttTensors(test);
    linearModel();
  };

  const linearModel = async () => {
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [1], units: 1 }));
    model.compile({ optimizer: "sgd", loss: "meanAbsoluteError" });
    if (trainnTensors) {
      setIsCompute(true);
      await model
        .fit(trainnTensors.sizeMB, trainnTensors.timeSec, {
          epochs: 10,
        })
        .finally(() =>
          setTimeout(() => {
            setIsCompute(false);
          }, 3000),
        );
    }
  };

  return (
    <div className={s.root}>
      <Header />
      <h2>Predicator</h2>
      <button
        className={classNames(s.button, isCompute && s.buttonDisabled)}
        onClick={handleClick}
        disabled={isCompute}
      >
        <div>{isCompute ? "Is computing..." : "To compute"}</div>
        {isCompute && <Spinner className={s.spinner} />}
      </button>
    </div>
  );
};
