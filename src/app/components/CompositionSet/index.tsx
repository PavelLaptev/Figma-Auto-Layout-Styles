import * as React from "react";
import styles from "./styles.module.scss";
import CompositionCard from "../CompositionCard";
import Button from "../Button";
import Input from "../Input";

interface Props extends CompositionTypes {
  onClick?: () => void;
  onChange?: (data) => void;
}

const CompositionSet: React.FunctionComponent<Props> = props => {
  const [data, setData] = React.useState({
    name: props.name,
    hookName: props.hookName,
    description: props.description,
    space: {
      top: props.space.top,
      right: props.space.right,
      bottom: props.space.bottom,
      left: props.space.left,
      between: props.space.between
    }
  } as CompositionTypes);

  const handleApply = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "apply-composition",
          data: data as CompositionTypes
        }
      },
      "*"
    );
    props.onClick();
  };

  return (
    <CompositionCard>
      <div className={styles.header}>
        <Input
          className={`${styles.input} ${styles.header_name}`}
          type={"text"}
          value={data.name}
        />
      </div>

      <form className={`${styles.section} ${styles.space}`}>
        <Input
          className={styles.input}
          value={data.space.between}
          label="Between"
          type={"number"}
          onChange={e => {
            setData(() => ({
              ...data,
              space: {
                top: data.space.top,
                right: data.space.right,
                bottom: data.space.bottom,
                left: data.space.left,
                between: +e.target.value
              }
            }));
          }}
        />
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
                left: data.space.left,
                between: data.space.between
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
                left: data.space.left,
                between: data.space.between
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
                left: data.space.left,
                between: data.space.between
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
                left: +e.target.value,
                between: data.space.between
              }
            }));
          }}
        />
      </form>

      <div className={styles.section}>
        <Input
          className={styles.input}
          label="Hook Name"
          type={"text"}
          value={data.hookName}
        />
      </div>

      <div className={styles.section}>
        <Input
          className={styles.input}
          label="Description"
          type={"text"}
          value={data.description}
        />
      </div>

      <div className={styles.section}>
        <Button text="Apply" onClick={handleApply} />
      </div>
    </CompositionCard>
  );
};

CompositionSet.defaultProps = {
  onClick: () => {},
  onChange: () => {}
} as Partial<Props>;

export default CompositionSet;
