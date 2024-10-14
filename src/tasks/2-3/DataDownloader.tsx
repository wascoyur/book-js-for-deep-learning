import { useState } from "react";
import ds from "./DataDownloader.module.css";
import Button from "../../common/Button/Button.tsx";
import {
  SRC_TEST_DATA,
  SRC_TEST_TARGET,
  SRC_TRAIN_DATA,
  SRC_TRAIN_TARGET,
} from "./CONST_ADDRESSES.ts";
import Papa from "papaparse";

type DataDownloaderProps = {
  currenAddress?: string;
};

export const DataDownloader = (props: DataDownloaderProps) => {
  const { currenAddress = "not defined" } = props;
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={ds.root}>
      <h3>DataDownloader</h3>
      <div className={ds.download_address}>
        <div>Download address:</div>
        <span className={ds.label_current_address}>{currenAddress}</span>
        <div>
          <span>
            <input
              type="text"
              placeholder="New download address"
              disabled={isLoading}
            />
            <Button label="Apply" />
          </span>
        </div>
        <ControlPanel />
      </div>
    </div>
  );
};

const ControlPanel = () => {
  const statrtDownload = async () => {
    const data = await LoadData([
      SRC_TRAIN_DATA,
      SRC_TRAIN_TARGET,
      SRC_TEST_DATA,
      SRC_TEST_TARGET,
    ]);
    console.log(data);
  };
  return (
    <div>
      <Button
        className={ds.btn}
        label="Start Download"
        onClick={statrtDownload}
      />
      <Button className={ds.btn} label="Parce Data" />
      <Button className={ds.btn} label="Start Learn" />
    </div>
  );
};

const shuffle = (data: number[]) => {
  let counter = data.length;
  let temp = 0;
  let index = 0;
  const target: typeof data = [];
  while (counter > 0) {
    index = (Math.random() * counter) | 0;
    counter--;
    // data:
    temp = data[counter];
    data[counter] = data[index];
    data[index] = temp;
    // target:
    temp = target[counter];
    target[counter] = target[index];
    target[index] = temp;
  }
  return target;
};

const LoadData = async (addresses: string[]) => {
  const results = await Promise.all(
    addresses.map((addr) => {
      return new Promise((resolve) => {
        Papa.parse(addr, {
          download: true,
          header: true,
          complete: (results: unknown) => resolve(results),
        });
      });
    }),
  );
  return results;
};
