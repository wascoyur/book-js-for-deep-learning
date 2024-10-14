import { Header } from "../../common/Header/Header.tsx";
import { DataDownloader } from "./DataDownloader.tsx";

type MultiLinRegressProps = {
  content?: React.ReactNode;
};

export const MultiLinRegress = (props: MultiLinRegressProps) => {
  const { content } = props;

  return (
    <>
      <Header />
      <h2>MultiLinRegress</h2>
      <div>{content}</div>
      <DataDownloader />
    </>
  );
};
