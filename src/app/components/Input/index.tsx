import * as React from "react";
import styles from "./styles.module.scss";

import TextareaAutosize from "react-textarea-autosize";

import Icon from "../Icon";
import Tooltip from "../Tooltip";

interface Props {
  className?: string;
  label?: string;
  value: any;
  tooltip?: {
    text: string;
    position: "center" | "left" | "right";
  };
  type?: "number" | "text" | "textarea";
  darkStyle?: boolean;
  disabled?: boolean;
  icon?: string;
  onChange?: (e) => void;
}

const Input: React.FunctionComponent<Props> = props => {
  const [val, setVal] = React.useState(props.value);

  const handleInputChange = e => {
    setVal(e.target.value);
    props.onChange(e);
  };

  const returnInputComponent = () => {
    if (props.type === "textarea") {
      return (
        <TextareaAutosize
          minRows={1}
          maxRows={4}
          disabled={props.disabled}
          className={`${styles.input} ${styles.textarea} ${
            props.darkStyle ? styles.darkStyle : styles.lightStyle
          }`}
          onChange={handleInputChange}
          value={val}
        />
      );
    } else {
      return (
        <input
          min={0}
          className={`${styles.input}  ${
            props.darkStyle ? styles.darkStyle : styles.lightStyle
          } ${props.icon ? styles.withIcon : null}`}
          type={props.type}
          value={val}
          onChange={handleInputChange}
        />
      );
    }
  };

  return (
    <div
      className={`${styles.wrap} ${props.className} ${
        props.disabled ? styles.disabled : null
      }`}
    >
      {props.tooltip ? (
        <Tooltip
          text={props.tooltip.text}
          position={props.tooltip.position}
          className={styles.tooltip}
        />
      ) : null}
      {props.icon ? <Icon className={styles.icon} name={props.icon} /> : null}
      {props.label ? (
        <label className={styles.label}>{props.label}</label>
      ) : null}
      {returnInputComponent()}
    </div>
  );
};

Input.defaultProps = {
  className: "",
  type: "number",
  label: null,
  darkStyle: false,

  disabled: false,
  icon: null,
  onChange: () => {}
} as Partial<Props>;

export default Input;
