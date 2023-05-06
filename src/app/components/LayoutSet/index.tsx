import * as React from "react";
import styles from "./styles.module.scss";
import LayoutCard from "../LayoutCard";
import Button from "../Button";
import SegmentControl from "../SegmentControl";
import Input from "../Input";

interface Props extends LayoutTypes {
  onApply?: () => void;
  onRemove?: () => void;
  onChange?: (data) => void;
}

interface AdjustProps {
  title?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const AdjustSection: React.FunctionComponent<AdjustProps> = (props) => {
  return (
    <div className={styles.adjustSection} style={props.style}>
      {props.title ? (
        <span className={styles.adjustSectionTitle}>{props.title}</span>
      ) : null}
      <div className={styles.adjustSectionChildren}>{props.children}</div>
    </div>
  );
};

const LayoutSet: React.FunctionComponent<Props> = (props) => {
  const [togglePaddings, setTogglePaddings] = React.useState(false);
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
          className={`${styles.input}`}
          type={"text"}
          value={data.name}
          onChange={(e) => {
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
          contentWidth
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
            text: data.fold ? "show details" : "hide details",
            position: "center"
          }}
        />
        <Button
          icon={data.lock ? "lock" : "unlock"}
          contentWidth
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
          contentWidth
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
          onClick={(i) => {
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
          onChange={(e) => {
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
        <Button
          className={`${styles.input} ${styles.inputButton}`}
          reverse
          disabled={data.lock ? true : false}
          contentWidth
          lightStyle={togglePaddings ? false : true}
          icon={"paddings"}
          text={`${data.space.top}, ${data.space.right}, ${data.space.bottom}, ${data.space.left}`}
          onClick={() => {
            setTogglePaddings(!togglePaddings);
          }}
          tooltip={{ text: "paddings", position: "center" }}
        />
      </div>

      <AdjustSection
        title="Paddings"
        style={{ display: togglePaddings ? "flex" : "none" }}
      >
        <Input
          disabled={data.lock}
          className={styles.input}
          value={data.space.top}
          label="Top"
          type={"number"}
          onChange={(e) => {
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
        <Input
          disabled={data.lock}
          className={styles.input}
          value={data.space.right}
          label="Right"
          type={"number"}
          onChange={(e) => {
            let newData = {
              ...data,
              space: {
                top: data.space.top,
                right: +e.target.value,
                bottom: data.space.bottom,
                left: data.space.left,
                between: data.space.between
              }
            } as LayoutTypes;
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
          onChange={(e) => {
            let newData = {
              ...data,
              space: {
                top: data.space.top,
                right: data.space.right,
                bottom: +e.target.value,
                left: data.space.left,
                between: data.space.between
              }
            } as LayoutTypes;
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
          onChange={(e) => {
            let newData = {
              ...data,
              space: {
                top: data.space.top,
                right: data.space.right,
                bottom: data.space.bottom,
                left: +e.target.value,
                between: data.space.between
              }
            } as LayoutTypes;
            props.onChange(newData);
            setData(newData);
          }}
        />
      </AdjustSection>

      <div style={{ display: data.fold ? "none" : "block" }}>
        <div className={styles.section}>
          <Input
            disabled={data.lock}
            className={styles.input}
            type={"text"}
            tooltip={{ text: "hook name", position: "center" }}
            value={data.hookName}
            onChange={(e) => {
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
            onChange={(e) => {
              let newData = {
                ...data,
                description: e.target.value
              } as LayoutTypes;
              props.onChange(newData);
              setData(newData);
            }}
          />
        </div>
      </div>
      <div style={{ marginTop: "8px", display: "flex" }}>
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
