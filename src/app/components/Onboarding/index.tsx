import * as React from "react";
import styles from "./styles.module.scss";
import Divider from "../Divider";
import Button from "../Button";
import OnBoardProvider from "./OnBoardProvider";

var logoImg = require("../../assets/logo.svg");

interface CardProps {
  title?: string;
  imageUrl?: string;
  children: any;
}

const slidesList = [
  {
    imageUrl: logoImg,
    title: null,
    children: (
      <p style={{ fontWeight: 600 }}>
        Create and adjust multiple autolayouts as composition configuration.
      </p>
    )
  } as CardProps,
  {
    imageUrl: null,
    title: "When do I need it?",
    children: (
      <>
        <p>
          If you use the same spacers between certain components or elements.
        </p>
        <p>
          If you have a team and want it to use and apply composition rules in a
          comfortable way.
        </p>
        <p>
          If you have multiple projects with different spacer setting and want
          to keep all in consistency.
        </p>
      </>
    )
  } as CardProps,
  {
    imageUrl: null,
    title: "How it works",
    children: (
      <>
        <p>
          The plugin works in the same way as sharable styles in Figma. But the
          plugin stores these styles as a JSON file.
        </p>
        <p>
          You can add so many compositions as you want and save them separately
          as a compositions configuration.
        </p>
      </>
    )
  } as CardProps,
  {
    imageUrl: null,
    title: "How to use",
    children: (
      <>
        <p>
          Before you will start to apply compositions, you need to select two or
          more elements. Than click “Apply” button and plugin will automatically
          apply auto-layout styles from the composition card.
        </p>
      </>
    )
  } as CardProps,
  {
    imageUrl: null,
    title: "Hook names",
    children: (
      <>
        <p>
          Hook names is a string that will be applied as an auto-layout layer
          name.
        </p>
        <p>
          This is important to have distinguish and unique names for each
          composition, because only with this condition the plugin will be able
          successfully update multiple composition automatically.
        </p>
      </>
    )
  } as CardProps,
  {
    imageUrl: null,
    title: "Update all by hooks",
    children: (
      <>
        <p>
          If you used the plugin before and adjusted all compositions, each type
          of composition will have a specific name.
        </p>
        <p>
          Clicking on the “Update all by hooks” button the plugin will go
          through all compositions on all file pages and apply compositions
          styles from you configuration.
        </p>
      </>
    )
  } as CardProps,
  {
    imageUrl: null,
    title: "Lock composition",
    children: (
      <>
        <p>
          Each composition can be locked if you want to make your work with the
          plugin more safely.
        </p>
      </>
    )
  } as CardProps,
  {
    imageUrl: null,
    title: "About",
    children: (
      <>
        <p>Version 1.0.0</p>
        <Divider />
        <p>
          Project on{" "}
          <a
            target="_blank"
            href="https://github.com/PavelLaptev/Figma-Auto-Layout-Styles"
          >
            GitHub
          </a>
        </p>
        <p>
          <a
            target="_blank"
            href="https://www.figma.com/file/MczslX4e8wjNnYTgy57RpI/Figma-Auto-Layout-Styles?node-id=0%3A1"
          >
            Figma project
          </a>
        </p>
        <p>
          {" "}
          <a target="_blank" href="mailto:laptev.graphics@gmail.com">
            Mail me
          </a>{" "}
          or visit{" "}
          <a target="_blank" href="https://pavellaptev.github.io/">
            my website
          </a>
        </p>
        <p>
          <a target="_blank" href="http://paypal.me/pavellaptev">
            Support the plugin
          </a>
        </p>
      </>
    )
  } as CardProps
];

const Card: React.FunctionComponent<CardProps> = props => {
  return (
    <div className={styles.card}>
      {props.imageUrl ? <img src={props.imageUrl} /> : null}
      {props.title ? <h2>{props.title}</h2> : null}
      {props.children}
    </div>
  );
};

const Onboarding = ({ toggleInfo }) => {
  return (
    <OnBoardProvider.Consumer>
      {toggle => (
        <div
          className={styles.wrap}
          style={
            toggle
              ? {
                  right: "0"
                }
              : { right: "-100%" }
          }
        >
          <Button
            className={styles.backButton}
            style={
              toggle
                ? {
                    position: "fixed",
                    opacity: 1,
                    left: "calc(var(--spacer-m) * 3)"
                  }
                : {}
            }
            text="Back to the plugin"
            icon="toLeft"
            reverse
            lightStyle
            onClick={toggleInfo}
          />
          {slidesList.map((card, i) => {
            return (
              <Card
                key={`info-card#${i}`}
                imageUrl={card.imageUrl}
                title={card.title}
              >
                {card.children}
              </Card>
            );
          })}
        </div>
      )}
    </OnBoardProvider.Consumer>
  );
};

export default Onboarding;
