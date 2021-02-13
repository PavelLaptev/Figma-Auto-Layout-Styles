import * as React from "react";
import styles from "./styles.module.scss";

interface Props {
  trigger: boolean;
}

interface CardProps {
  title: string;
}

const Card: React.FunctionComponent<CardProps> = props => {
  return (
    <div className={styles.card}>
      <h2>{props.title}</h2>
    </div>
  );
};

const Onboarding: React.FunctionComponent<Props> = () => {
  // const [trigger, setTrigger] = React.useState(props.trigger);

  return (
    <div className={styles.wrap}>
      <Card title="hello" />
    </div>
  );
};

Onboarding.defaultProps = {} as Partial<Props>;

export default Onboarding;
