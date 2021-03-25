import * as React from "react";
import styles from "./styles.module.scss";
import LayoutCard from "../LayoutCard";
import Button from "../Button";
import SegmentControl from "../SegmentControl";
import Input from "../Input";
import Divider from "../Divider";

interface Props extends LayoutTypes {
  onApply?: () => void;
  onRemove?: () => void;
  onChange?: (data) => void;
}

const LayoutSet: React.FunctionComponent<Props> = props => {
  const [data, setData] = React.useState({
    pluginID: props.pluginID,
    name: props.name,
    direction: props.direction,
    hookName: props.hookName,
    description: props.description,
    lock: props.lock,
    fold: props.fold,
    space: {
      top: props.space.top,
      right: props.space.right,
      bottom: props.space.bottom,
      left: props.space.left,
      between: props.space.between
    }
  } as LayoutTypes);

  const handleApply = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "apply-layout",
          data: data as LayoutTypes
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
    <LayoutCard className={styles.card}>
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
            } as LayoutTypes;
            props.onChange(newData);
            setData(newData);
          }}
        />
        <Button
          icon={data.fold ? "unfold" : "fold"}
          iconWidth
          lightStyle={data.fold ? false : true}
          onClick={() => {
            let newData = {
              ...data,
              fold: !data.fold
            } as LayoutTypes;
            props.onChange(newData);
            setData(newData);
          }}
          tooltip={{
            text: data.fold ? "unfold" : "fold details",
            position: "center"
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
            } as LayoutTypes;
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
          className={`${styles.input} ${styles.direction}`}
          disabled={data.lock ? true : false}
          selected={data.direction === "VERTICAL" ? 0 : 1}
          buttons={[
            {
              icon: "toDown",
              tooltip: "set by vertical"
            },
            {
              icon: "toRight",
              tooltip: "set by horizontal"
            }
          ]}
          onClick={i => {
            let newData = {
              ...data,
              direction: i === 0 ? "VERTICAL" : "HORIZONTAL"
            } as LayoutTypes;
            props.onChange(newData);
            setData(newData);
          }}
        />
        <Input
          disabled={data.lock}
          className={`${styles.input} ${styles.spaceBetween}`}
          value={data.space.between}
          icon="space-between"
          type={"number"}
          tooltip={{ text: "space between", position: "center" }}
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
            } as LayoutTypes;
            props.onChange(newData);
            setData(newData);
          }}
        />
        <div className={styles.paddingsInput}>
          <Input
            disabled={data.lock}
            className={styles.input}
            icon="paddings"
            value={`${data.space.top}, ${data.space.right}, ${data.space.bottom}, ${data.space.left}`}
            type={"text"}
            tooltip={{ text: "align and paddings", position: "center" }}
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
              } as LayoutTypes;
              props.onChange(newData);
              setData(newData);
            }}
          />
        </div>
      </div>

      <Divider />

      <div style={{ display: "flex" }}>
        <Input
          disabled={data.lock}
          className={styles.input}
          type={"text"}
          tooltip={{ text: "hook name", position: "center" }}
          value={data.hookName}
          onChange={e => {
            let newData = {
              ...data,
              hookName: e.target.value
            } as LayoutTypes;
            props.onChange(newData);
            setData(newData);
          }}
        />
      </div>

      <div className={styles.section}>
        <Input
          disabled={data.lock}
          className={styles.input}
          type={"textarea"}
          tooltip={{ text: "description", position: "center" }}
          value={data.description}
          onChange={e => {
            let newData = {
              ...data,
              description: e.target.value
            } as LayoutTypes;
            props.onChange(newData);
            setData(newData);
          }}
        />
      </div>

      <div style={{ marginTop: "4px", display: "flex" }}>
        <Button text="Apply" onClick={handleApply} />
      </div>
    </LayoutCard>
  );
};

LayoutSet.defaultProps = {
  onApply: () => {},
  onChange: () => {}
} as Partial<Props>;

export default LayoutSet;
