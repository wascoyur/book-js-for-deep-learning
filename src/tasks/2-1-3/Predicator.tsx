import { Header } from "../../common/Header/Header.tsx";
import { testData, trainData } from "../../assets/predicatorData.ts";
import { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { Spinner } from "../../common/Spinner/Spinner.tsx";
import s from "./Predictor.module.css";
import classNames from "classnames";

export const Predicator = () => {
  const [isCompute, setIsCompute] = useState(false);
  const [resultComputed, setResultComputed] = useState("No result");
  const [resultTest, setResultTest] = useState("No test");
  const [controlDataModel, setControlDataModel] = useState("");
  const [model, setModel] = useState<tf.Sequential | undefined>();

  tf.util.shuffle(trainData.timeSec);

  function getTrainTensors() {
    return {
      sizeMB: tf.tensor2d(trainData.sizeMB, [20, 1]),
      timeSec: tf.tensor2d(trainData.timeSec, [20, 1]),
    };
  }

  function getTestTensors() {
    return {
      sizeMB: tf.tensor2d(testData.sizeMB, [20, 1]),
      timeSec: tf.tensor2d(testData.timeSec, [20, 1]),
    };
  }

  const handleClick = () => {
    createLinearModel();
    if (model) {
      createLinearRegression(model).then(() => {
        modelForPredict(model);
      });
    }
  };

  const handleTesting = () => {
    if (model) {
      controlTestingModel(model);
    }
  };

  const createLinearModel = () => {
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [1], units: 1 }));
    model.compile({ optimizer: "sgd", loss: "meanAbsoluteError" });
    setModel(model);
  };

  const controlTestingModel = (model: tf.Sequential) => {
    const test = model
      .evaluate(getTestTensors().sizeMB, getTestTensors().timeSec)
      .toString();
    setControlDataModel(test);
  };

  const createLinearRegression = async (model: tf.Sequential) => {
    setIsCompute(true);
    const result = await model
      .fit(getTrainTensors().sizeMB, getTrainTensors().timeSec, {
        epochs: 200,
      })
      .finally(() => setIsCompute(false));
    return result;
  };

  const modelForPredict = (model: tf.LayersModel) => {
    const smallFileMB = 1;
    const bigFileMB = 100;
    const hugeFileMB = 10000;
    const predict = model
      .predict(tf.tensor2d([[smallFileMB], [bigFileMB], [hugeFileMB]]))
      .toString();
    setResultComputed(`modelForPredict: ${predict}`);
  };

  return (
    <div className={s.root}>
      <Header />
      <h2>Predicator</h2>
      <div className={s.control_panel}>
        <button
          className={classNames(s.button, isCompute && s.buttonDisabled)}
          onClick={handleClick}
          disabled={isCompute}
        >
          <div>{isCompute ? "Is computing..." : "To compute"}</div>
          {isCompute && <Spinner className={s.spinner} />}
        </button>
        <button
          className={classNames(s.button)}
          onClick={handleTesting}
          disabled={!model}
        >
          <div>Тестирование</div>
        </button>
      </div>
      <div className={s.output}>
        <p>Result computing:</p>
        <div className={s.result}>{resultComputed}</div>
      </div>
      <div className={s.test}>
        <p>Result test</p>
        <div className={s.result}>{resultTest}</div>
      </div>
      <div className={s.control_model}>
        <p>Оценка модели на контрольных данных</p>
        <div className={s.result}>{controlDataModel}</div>
      </div>
    </div>
  );
};
