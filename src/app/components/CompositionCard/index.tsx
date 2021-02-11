import * as React from "react";
import styles from "./styles.module.scss";

interface Props {
  className?: string;
}

const CompositionBlock: React.FunctionComponent<Props> = props => {
  return (
    <div className={`${styles.wrap} ${props.className}`}>{props.children}</div>
  );
};

CompositionBlock.defaultProps = {
  className: ""
} as Partial<Props>;

export default CompositionBlock;
