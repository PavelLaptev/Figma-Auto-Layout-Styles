import * as React from "react";
import styles from "./styles.module.scss";

interface Props {
  className?: any;
}

const Divider: React.FunctionComponent<Props> = () => {
  return <hr className={styles.divider} />;
};

Divider.defaultProps = {
  className: null
} as Partial<Props>;

export default Divider;
