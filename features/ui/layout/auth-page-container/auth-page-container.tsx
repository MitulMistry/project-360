import { Head } from "../head";
import classNames from "classnames";
import styles from "./auth-page-container.module.scss";

type AuthPageContainerProps = {
  children: React.ReactNode;
  title: string;
  className?: string;
};

export function AuthPageContainer({
  children,
  title,
  className,
}: AuthPageContainerProps) {
  return (
    <div className={styles.container}>
      <Head title={title} />

      <main className={classNames(styles.main, className)}>{children}</main>
    </div>
  );
}
