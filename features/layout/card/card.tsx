import { ReactNode } from "react";
import styles from "./card.module.scss";
import classNames from "classnames";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div className={classNames(styles.container, className)}>{children}</div>
  );
}
