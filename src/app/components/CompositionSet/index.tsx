import * as React from "react";
import styles from "./styles.module.scss";
import CompositionCard from "../CompositionCard";
import Button from "../Button";
import SegmentControl from "../SegmentControl";
import Input from "../Input";

interface Props extends CompositionTypes {
  onApply?: () => void;
  onRemove?: () => void;
  onChange?: (data) => void;
}

const CompositionSet: React.FunctionComponent<Props> = props => {
  const [data, setData] = React.useState({
    pluginID: props.pluginID,
    name: props.name,
    direction: props.direction,
    hookName: props.hookName,
    description: props.description,
    lock: props.lock,
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
    props.onApply();
  };

  const handleRemove = () => {
    props.onRemove();
  };

  return (
    <CompositionCard className={styles.card}>
      <div className={styles.header}>
        <Input
          disabled={data.lock}
          className={`${styles.input} ${styles.header_name}`}
          type={"text"}
          value={data.name}
          onChange={e => {
            let newData = {
              ...data,
              name: e.target.value
            } as CompositionTypes;
            props.onChange(newData);
            setData(newData);
          }}
        />
        <Button
          icon={data.lock ? "lock" : "unlock"}
          iconWidth
          lightStyle={data.lock ? false : true}
          onClick={() => {
            let newData = {
              ...data,
              lock: !data.lock
            } as CompositionTypes;
            props.onChange(newData);
            setData(newData);
          }}
          tooltip={{ text: data.lock ? "unlock" : "lock", position: "center" }}
        />
        <Button
          icon={"cross"}
          iconWidth
          lightStyle
          onClick={handleRemove}
          tooltip={{ text: "remove", position: "center" }}
        />
      </div>

      <div className={`${styles.section} ${styles.space}`}>
        <SegmentControl
          className={styles.input}
          label="Direction"
          disabled={data.lock ? true : false}
          selected={data.direction === "VERTICAL" ? 0 : 1}
          buttons={[
            {
              icon: "toDown",
              tooltip: "vertical"
            },
            {
              icon: "toRight",
              tooltip: "horizontal"
            }
          ]}
          onClick={i => {
            let newData = {
              ...data,
              direction: i === 0 ? "VERTICAL" : "HORIZONTAL"
            } as CompositionTypes;
            props.onChange(newData);
            setData(newData);
          }}
        />
        <Input
          disabled={data.lock}
          className={styles.input}
          value={data.space.between}
          label="Space between"
          type={"number"}
          onChange={e => {
            let newData = {
              ...data,
              space: {
                top: data.space.top,
                right: data.space.right,
                bottom: data.space.bottom,
                left: data.space.left,
                between: +e.target.value
              }
            } as CompositionTypes;
            props.onChange(newData);
            setData(newData);
          }}
        />
      </div>

      <div className={`${styles.section} ${styles.space}`}>
        <Input
          disabled={data.lock}
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
            } as CompositionTypes;
            props.onChange(newData);
            setData(newData);
          }}
        />
        <Input
          disabled={data.lock}
          className={styles.input}
          value={data.space.right}
          label="Right"
          type={"number"}
          onChange={e => {
            let newData = {
              ...data,
              space: {
                top: data.space.top,
                right: +e.target.value,
                bottom: data.space.bottom,
                left: data.space.left,
                between: data.space.between
              }
            } as CompositionTypes;
            props.onChange(newData);
            setData(newData);
          }}
        />
        <Input
          disabled={data.lock}
          className={styles.input}
          value={data.space.bottom}
          label="Bottom"
          type={"number"}
          onChange={e => {
            let newData = {
              ...data,
              space: {
                top: data.space.top,
                right: data.space.right,
                bottom: +e.target.value,
                left: data.space.left,
                between: data.space.between
              }
            } as CompositionTypes;
            props.onChange(newData);
            setData(newData);
          }}
        />
        <Input
          disabled={data.lock}
          className={styles.input}
          value={data.space.left}
          label="Left"
          type={"number"}
          onChange={e => {
            let newData = {
              ...data,
              space: {
                top: data.space.top,
                right: data.space.right,
                bottom: data.space.bottom,
                left: +e.target.value,
                between: data.space.between
              }
            } as CompositionTypes;
            props.onChange(newData);
            setData(newData);
          }}
        />
      </div>

      <div className={styles.section}>
        <Input
          disabled={data.lock}
          className={styles.input}
          label="Hook Name"
          type={"text"}
          value={data.hookName}
          onChange={e => {
            let newData = {
              ...data,
              hookName: e.target.value
            } as CompositionTypes;
            props.onChange(newData);
            setData(newData);
          }}
        />
      </div>

      <div className={styles.section}>
        <Input
          disabled={data.lock}
          className={styles.input}
          label="Description"
          type={"textarea"}
          value={data.description}
          onChange={e => {
            let newData = {
              ...data,
              description: e.target.value
            } as CompositionTypes;
            props.onChange(newData);
            setData(newData);
          }}
        />
      </div>

      <div className={styles.section}>
        <Button text="Apply" onClick={handleApply} />
      </div>
    </CompositionCard>
  );
};

CompositionSet.defaultProps = {
  onApply: () => {},
  onChange: () => {}
} as Partial<Props>;

export default CompositionSet;
