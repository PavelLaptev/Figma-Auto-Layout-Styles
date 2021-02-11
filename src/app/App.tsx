import * as React from "react";
import styles from "./app.module.scss";
import Button from "./components/Button";
import CompositionCard from "./components/CompositionCard";
import CompositionSet from "./components/CompositionSet";
import Input from "./components/Input";
import Divider from "./components/Divider";

// Application
const App = ({}) => {
  const [config, setConfig] = React.useState({
    about: {
      version: "1.0.0",
      name: "Alteos Selling Flow"
    },
    compositions: [
      {
        name: "Composition Small",
        hookName: "🐶CompS",
        description: "Some text",
        space: {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          between: 16
        }
      } as CompositionTypes,
      {
        name: "Composition Medium",
        hookName: "🦊CompM",
        description: "Some text",
        space: {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          between: 24
        }
      } as CompositionTypes,
      {
        name: "Composition Large",
        hookName: "🐻CompL",
        description: "Some text",
        space: {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          between: 32
        }
      } as CompositionTypes
    ]
  } as ConfigTypes);

  ////////////////////////////////////////////////////////////////
  //////////////////////////// RENDER ////////////////////////////
  ////////////////////////////////////////////////////////////////
  const handleNewComposition = () => {
    console.log(config);

    setConfig({
      ...config,
      compositions: [
        ...config.compositions,
        {
          name: "New composition",
          hookName: "🐻CompNew",
          description: "Some text",
          space: {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            between: 32
          }
        } as CompositionTypes
      ]
    });
  };

  return (
    <div>
      <div className={styles.header}>
        <Input
          className={`${styles.title}`}
          type={"Compositions"}
          value={config.about.name}
          onChange={e => {
            setConfig({
              about: {
                name: e.target.value,
                version: config.about.version
              },
              compositions: config.compositions
            });
          }}
        />
        <Button icon={"plus"} onClick={() => {}} />
      </div>

      <Divider />

      {config.compositions.map((item, i) => {
        return (
          <CompositionSet
            key={`${item.hookName}${i}`}
            name={item.name}
            hookName={item.hookName}
            description={item.description}
            space={{
              top: item.space.top,
              right: item.space.right,
              bottom: item.space.bottom,
              left: item.space.left,
              between: item.space.between
            }}
            onChange={data => {
              setConfig({
                ...config,
                [i]: { ...data }
              });
            }}
          />
        );
      })}
      <CompositionCard>
        <Button icon="plus" onClick={handleNewComposition} />
      </CompositionCard>
    </div>
  );
};

export default App;
