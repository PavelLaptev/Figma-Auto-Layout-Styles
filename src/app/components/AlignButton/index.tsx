import * as React from "react";
import styles from "./styles.module.scss";

interface Props {
  className?: any;
  onClick?: (e) => void;
}

const Button: React.FunctionComponent<Props> = props => {
  return <div className={`${props.alignButton} ${props.className}`} />;
};

Button.defaultProps = {
  className: null,
  onClick: () => {}
} as Partial<Props>;

export default Button;
