import * as React from "react";
import styles from "./app.module.scss";

import { generateRandomID, downloadJSON, getRandomKey } from "../utils";

import Button from "./components/Button";
import CompositionCard from "./components/CompositionCard";
import CompositionSet from "./components/CompositionSet";
import Input from "./components/Input";
import Divider from "./components/Divider";

// Application
const App = ({}) => {
  const [appKey, setAppKey] = React.useState(getRandomKey());
  const [config, setConfig] = React.useState({
    about: {
      version: "1.0.0",
      name: "Alteos Selling Flow"
    },
    compositions: [
      {
        pluginID: getRandomKey(),
        name: "Composition Small",
        hookName: "🐶CompS",
        description: "Some text",
        lock: false,
        space: {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          between: 16
        }
      } as CompositionTypes,
      {
        pluginID: getRandomKey(),
        name: "Composition Medium",
        hookName: "🦊CompM",
        description: "Some text",
        lock: true,
        space: {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          between: 24
        }
      } as CompositionTypes,
      {
        pluginID: getRandomKey(),
        name: "Composition Large",
        hookName: "🐻CompL",
        description: "Some text",
        lock: false,
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

  // ADD NEW COMPOSITION
  let uniqueID = generateRandomID();

  const handleNewComposition = () => {
    setConfig({
      ...config,
      compositions: [
        ...config.compositions,
        {
          pluginID: getRandomKey(),
          name: `New Composition ${uniqueID}`,
          hookName: uniqueID,
          description: "Some text",
          lock: false,
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

  // SAVE CONFIG FILE
  const handleSaveConfigFile = () => {
    downloadJSON(config, `${config.about.name}.json`, "application/json");
  };

  // UPLOAD CONFIG FILE
  const handleUploadConfigFile = e => {
    let reader = new FileReader();
    reader.readAsText(e.target.files[0]);

    reader.onload = () => {
      let result = JSON.parse(reader.result as string);
      setConfig(result);
      setAppKey(getRandomKey());
    };
  };

  // UPDATE ALL BY HOOKS
  const handleUpdateAll = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "update-all",
          data: config as ConfigTypes
        }
      },
      "*"
    );
  };

  ////////////////////////////////////////////////////////////////
  //////////////////////////// RENDER ////////////////////////////
  ////////////////////////////////////////////////////////////////

  return (
    <div key={appKey}>
      <div className={styles.header}>
        <Input
          className={`${styles.title}`}
          darkStyle
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
        <Button
          icon={"upload"}
          type="file"
          iconWidth
          onFileChange={handleUploadConfigFile}
          tooltip={{ text: "add from folder", position: "center" }}
        />
        <Button
          icon={"save"}
          iconWidth
          onClick={handleSaveConfigFile}
          tooltip={{ text: "save config", position: "center" }}
        />
        <Button
          icon={"info"}
          iconWidth
          onClick={() => {}}
          tooltip={{ text: "how-to", position: "right" }}
        />
      </div>

      <Divider />

      {config.compositions.map((item, i) => {
        return (
          <CompositionSet
            key={`${item.pluginID}`}
            pluginID={item.pluginID}
            name={item.name}
            hookName={item.hookName}
            description={item.description}
            lock={item.lock}
            space={{
              top: item.space.top,
              right: item.space.right,
              bottom: item.space.bottom,
              left: item.space.left,
              between: item.space.between
            }}
            onRemove={() => {
              setConfig({
                ...config,
                compositions: config.compositions.filter(value => {
                  return value !== item;
                })
              });
            }}
            onChange={data => {
              // UPDATE THE STATE
              // https://stackoverflow.com/questions/39889009/replace-object-in-array-on-react-state
              let updatedCompositions = config.compositions;
              // console.log(updatedCompositions[i]);
              updatedCompositions[i] = data;

              setConfig({
                ...config,
                compositions: updatedCompositions
              });
            }}
          />
        );
      })}
      <CompositionCard>
        <Button
          icon="plus"
          onClick={handleNewComposition}
          tooltip={{ text: "add new composition", position: "center" }}
        />
      </CompositionCard>

      <Divider />

      <CompositionCard>
        <Button
          icon="update"
          text="Update all by hooks"
          lightStyle
          onClick={handleUpdateAll}
        />
      </CompositionCard>
    </div>
  );
};

export default App;
