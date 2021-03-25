import * as React from "react";
import styles from "./styles.module.scss";

interface Props {
  className?: string;
  text: string;
  position: "center" | "left" | "right";
}

const LayoutCard: React.FunctionComponent<Props> = props => {
  const setPosition = () => {
    if (props.position === "left") {
      return styles.tooltipLeft;
    }
    if (props.position === "center") {
      return styles.tooltipCenter;
    }
    if (props.position === "right") {
      return styles.tooltipRight;
    }
  };

  return (
    <div className={`${styles.tooltip} ${props.className} ${setPosition()}`}>
      {props.text}
    </div>
  );
};

LayoutCard.defaultProps = {
  className: ""
} as Partial<Props>;

export default LayoutCard;
