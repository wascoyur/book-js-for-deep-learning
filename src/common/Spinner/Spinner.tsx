import classNames from "classnames";
import s from "./Spinner.module.css";

type Props = {
  className?: string;
};
export const Spinner = (props: Props) => {
  const { className } = props;
  return <div className={classNames(s.root, className)} />;
};
