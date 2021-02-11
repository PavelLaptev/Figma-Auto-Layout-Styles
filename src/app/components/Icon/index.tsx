import * as React from "react";
import styles from "./styles.module.scss";

import icons from "./icons";

interface Props {
  className?: any;
  name: string;
}

const Icon: React.FunctionComponent<Props> = props => {
  return (
    <i className={`${props.className} ${styles.icon}`}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {icons[props.name]}
      </svg>
    </i>
  );
};

Icon.defaultProps = {} as Partial<Props>;

export default Icon;
