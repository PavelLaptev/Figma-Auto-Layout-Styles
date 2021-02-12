import * as React from "react";
import styles from "./styles.module.scss";

interface Props {
  className?: string;
  label?: string;
  value: any;
  type?: string;
  darkStyle?: boolean;
  disabled?: boolean;
  onChange?: (e) => void;
}

const Input: React.FunctionComponent<Props> = props => {
  const [val, setVal] = React.useState(props.value);

  const handleInputChange = e => {
    setVal(e.target.value);
    props.onChange(e);
  };

  return (
    <div className={`${styles.wrap} ${props.className} `}>
      {props.label ? (
        <label className={styles.label}>{props.label}</label>
      ) : null}
      <input
        disabled={props.disabled}
        min={0}
        className={`${styles.input} ${
          props.darkStyle ? styles.darkStyle : styles.lightStyle
        }`}
        type={props.type}
        value={val}
        onChange={handleInputChange}
      />
    </div>
  );
};

Input.defaultProps = {
  className: "",
  type: "number",
  label: null,
  darkStyle: false,
  onChange: () => {},
  disabled: false
} as Partial<Props>;

export default Input;
