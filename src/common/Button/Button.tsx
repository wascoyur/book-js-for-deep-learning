import classNames from "classnames";
import s from "./Button.module.css";
import { ComponentProps, ElementType } from "react";

type ButtonOwnProps<E extends ElementType = ElementType> = {
  className?: string;
  label?: string;
  children?: React.ReactNode;
  as?: E;
};

type ButtonProps<E extends ElementType> = ButtonOwnProps<E> &
  Omit<ComponentProps<E>, keyof ButtonOwnProps>;

const defaultElement = "button";

export default function Button<E extends ElementType = typeof defaultElement>({
  children,
  as,
  className,
  label = "Button",
  ...otherProps
}: ButtonProps<E>) {
  const TagName = as || defaultElement;

  return (
    <TagName className={classNames(s.root, className)} {...otherProps}>
      <span>
        {label}
        {children}
      </span>
    </TagName>
  );
}
