import * as React from "react";
import styles from "./styles.module.scss";

interface Props {
  className?: string;
}

const Tooltip: React.FunctionComponent<Props> = props => {
  return (
    <div className={`${styles.wrap} ${props.className}`}>{props.children}</div>
  );
};

Tooltip.defaultProps = {
  className: ""
} as Partial<Props>;

export default Tooltip;
