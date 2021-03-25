import * as React from "react";
import styles from "./styles.module.scss";
import Button from "../Button";

interface ButtonProps {
  icon?: string;
  text?: string;
  tooltip?: string;
}

interface Props {
  className?: string;
  label?: string;
  buttons: Array<ButtonProps>;
  disabled?: boolean;
  onClick?: (e) => void;
  selected?: number;
  fullWidth?: boolean;
  wrap?: boolean;
}

const SegmentControl: React.FunctionComponent<Props> = props => {
  const [selected, setSelected] = React.useState(props.selected);

  const handleClick = i => {
    setSelected(i);
    props.onClick(i);
  };

  return (
    <div
      className={`${styles.wrap} ${props.className} ${
        props.fullWidth ? styles.fullWidth : null
      } `}
    >
      {props.label ? (
        <label className={styles.label}>{props.label}</label>
      ) : null}
      <div
        className={`${styles.buttons} ${
          props.wrap ? styles.wrapButtons : null
        }`}
      >
        {props.buttons.map((button, i) => {
          // console.log(button);
          return (
            <Button
              key={`button${i}`}
              disabled={props.disabled}
              text={button.text}
              className={`${styles.button} ${
                props.fullWidth ? styles.fullWidthButton : null
              }`}
              icon={button.icon}
              contentWidth
              tooltip={
                button.tooltip
                  ? { text: button.tooltip, position: "center" }
                  : null
              }
              lightStyle={selected === i ? false : true}
              onClick={() => handleClick(i)}
            />
          );
        })}
      </div>
    </div>
  );
};

SegmentControl.defaultProps = {
  className: "",
  label: null,
  text: null,
  buttons: [],
  disabled: false,
  selected: 0,
  fullWidth: false
} as Partial<Props>;

export default SegmentControl;
