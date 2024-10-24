import { useEffect, useState } from "react";
import ds from "./DataDownloader.module.css";
import Button from "../../common/Button/Button.tsx";
import {
  SRC_TEST_DATA,
  SRC_TEST_TARGET,
  SRC_TRAIN_DATA,
  SRC_TRAIN_TARGET,
} from "./CONST_ADDRESSES.ts";
import { dataLoader, stringValToFloat, useDataLoader } from "./helpers.ts";

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
  const [csvData, setCsvData] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const startDownload = async () => {
    const urls = [
      SRC_TRAIN_DATA,
      SRC_TRAIN_TARGET,
      SRC_TEST_DATA,
      SRC_TEST_TARGET,
    ];
    const urlNames = ["trainData", "trainTarget", "testData", "testTarget"];

    setIsLoading(true);
    setError(null);

    try {
      const downloadPromises = urls.map((url, index) =>
        dataLoader([url]).then((data) => ({ [urlNames[index]]: data })),
      );

      const results = await Promise.all(downloadPromises);

      const newCsvData = results.reduce(
        (acc, result) => ({ ...acc, ...result }),
        {},
      );
      setCsvData(newCsvData);
    } catch (err) {
      setError("Failed to download data. Please try again.");
      console.error("Download error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        className={ds.btn}
        label="Start Download"
        onClick={() => startDownload()}
      />
      <Button className={ds.btn} label="Parce Data" />
      <Button className={ds.btn} label="Start Learn" />
    </div>
  );
};
