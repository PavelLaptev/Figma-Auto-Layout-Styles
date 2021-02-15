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
}

const SegmentControl: React.FunctionComponent<Props> = props => {
  const [selected, setSelected] = React.useState(props.selected);

  const handleClick = i => {
    setSelected(i);
    props.onClick(i);
  };

  return (
    <div className={`${styles.wrap} ${props.className}`}>
      <label className={styles.label}>{props.label}</label>
      <div className={styles.buttons}>
        {props.buttons.map((button, i) => {
          // console.log(button);
          return (
            <Button
              key={`button${i}`}
              disabled={props.disabled}
              className={styles.button}
              icon={button.icon}
              iconWidth
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
  label: "Label",
  buttons: [],
  disabled: false,
  selected: 0
} as Partial<Props>;

export default SegmentControl;
