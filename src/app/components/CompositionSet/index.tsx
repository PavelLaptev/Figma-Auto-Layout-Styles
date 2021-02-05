import * as React from "react";
import styles from "./styles.module.scss";
import Input from "../Input";

interface Props {
  name: string;
  space: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  onClick: () => void;
  onChange?: (data) => void;
}

const CompositionSet: React.FunctionComponent<Props> = props => {
  const [data, setData] = React.useState({
    name: props.name,
    space: {
      top: props.space.top,
      right: props.space.right,
      bottom: props.space.bottom,
      left: props.space.left
    }
  });

  const handleApply = () => {
    props.onClick();
  };

  return (
    <div className={styles.wrap}>
      <div
        className={styles.name}
        contentEditable
        suppressContentEditableWarning
      >
        {data.name}
      </div>
      <form className={styles.inputGroup}>
        <Input
          className={styles.input}
          value={data.space.top}
          label="Top"
          type={"number"}
          onChange={e => {
            let newData = {
              ...data,
              space: {
                top: +e.target.value,
                right: data.space.right,
                bottom: data.space.bottom,
                left: data.space.left
              }
            };
            props.onChange(newData);
            console.log(newData);
            setData(newData);
          }}
        />
        <Input
          className={styles.input}
          value={data.space.right}
          label="Right"
          type={"number"}
          onChange={e => {
            setData(() => ({
              ...data,
              space: {
                top: data.space.top,
                right: +e.target.value,
                bottom: data.space.bottom,
                left: data.space.left
              }
            }));
          }}
        />
        <Input
          className={styles.input}
          value={data.space.bottom}
          label="Bottom"
          type={"number"}
          onChange={e => {
            setData(() => ({
              ...data,
              space: {
                top: data.space.top,
                right: data.space.right,
                bottom: +e.target.value,
                left: data.space.left
              }
            }));
          }}
        />
        <Input
          className={styles.input}
          value={data.space.left}
          label="Left"
          type={"number"}
          onChange={e => {
            setData(() => ({
              ...data,
              space: {
                top: data.space.top,
                right: data.space.right,
                bottom: data.space.bottom,
                left: +e.target.value
              }
            }));
          }}
        />
      </form>

      <button onClick={handleApply}>Apply</button>
      <hr />
    </div>
  );
};

CompositionSet.defaultProps = {
  onChange: () => {}
} as Partial<Props>;

export default CompositionSet;
