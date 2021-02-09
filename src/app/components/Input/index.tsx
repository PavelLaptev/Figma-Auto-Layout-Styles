import * as React from "react";
import styles from "./styles.module.scss";

interface Props {
  className?: string;
  label?: string;
  value: any;
  type?: string;
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
        className={styles.input}
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
  onChange: () => {}
} as Partial<Props>;

export default Input;
