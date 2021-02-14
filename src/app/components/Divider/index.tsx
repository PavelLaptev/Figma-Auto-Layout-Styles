import * as React from "react";
import styles from "./styles.module.scss";

interface Props {}

const Divider: React.FunctionComponent<Props> = () => {
  return <hr className={styles.divider} />;
};

Divider.defaultProps = {} as Partial<Props>;

export default Divider;
