import * as React from "react";
import styles from "./app.module.scss";

import { generateRandomID, downloadJSON, getRandomKey } from "../utils";

import Button from "./components/Button";
import CompositionCard from "./components/CompositionCard";
import CompositionSet from "./components/CompositionSet";
import Input from "./components/Input";
import Divider from "./components/Divider";
import Onboarding from "./components/Onboarding";
import OnBoardProvider from "./components/Onboarding/OnBoardProvider";

///////////////////////////////////////////////
///////////////// APPLICATION /////////////////
///////////////////////////////////////////////
const App = ({}) => {
  const [toggleInfo, setToggleInfo] = React.useState(false);
  const [appKey, setAppKey] = React.useState(getRandomKey());
  const [config, setConfig] = React.useState({
    about: {
      version: "1.0.3",
      name: "My Autolayout Config"
    },
    compositions: [
      {
        pluginID: getRandomKey(),
        name: "Small Layout",
        direction: "VERTICAL",
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
        name: "Medium Layout",
        direction: "VERTICAL",
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
        name: "Large Layout",
        direction: "VERTICAL",
        hookName: "🐻CompL",
        description: "For large compositions - like blocks of components",
        lock: false,
        space: {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          between: 32
        }
      } as CompositionTypes,
      {
        pluginID: getRandomKey(),
        name: "Cards Layout",
        direction: "HORIZONTAL",
        hookName: "🐭CardsLayout",
        description: "This layout is for cards only.",
        lock: false,
        space: {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          between: 16
        }
      } as CompositionTypes
    ]
  } as ConfigTypes);

  ///////////////////////////////////////////////
  ///////////// ADD NEW COMPOSITION /////////////
  ///////////////////////////////////////////////
  let uniqueID = generateRandomID();
  const handleNewComposition = () => {
    setConfig({
      ...config,
      compositions: [
        ...config.compositions,
        {
          pluginID: getRandomKey(),
          name: `New Composition ${uniqueID}`,
          direction: "VERTICAL",
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

  ///////////////////////////////////////////////
  ///////////// SAVE CONFIG FILE ////////////////
  ///////////////////////////////////////////////
  const handleSaveConfigFile = () => {
    downloadJSON(config, `${config.about.name}.json`, "application/json");
  };

  ///////////////////////////////////////////////
  ///////////// UPLOAD CONFIG FILE /////////////
  ///////////////////////////////////////////////
  const handleUploadConfigFile = e => {
    let reader = new FileReader();
    reader.readAsText(e.target.files[0]);

    reader.onload = () => {
      let result = JSON.parse(reader.result as string);
      setConfig(result);
      setAppKey(getRandomKey());
    };
  };

  ///////////////////////////////////////////////
  ///////////// UPDATE ALL BY HOOKS /////////////
  ///////////////////////////////////////////////
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

  //////////////////////////////////////////////
  /////////////////// RENDER ///////////////////
  //////////////////////////////////////////////

  return (
    <OnBoardProvider.Provider value={toggleInfo}>
      <div
        className={styles.app}
        style={
          toggleInfo
            ? { overflowY: "hidden", height: "100%" }
            : { overflowY: "visible", height: "auto" }
        }
      >
        <Onboarding
          toggleInfo={() => {
            setToggleInfo(!toggleInfo);
          }}
        />
        <div key={appKey}>
          <div className={styles.header}>
            <Input
              className={`${styles.title}`}
              darkStyle
              type="text"
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
              onClick={() => {
                setToggleInfo(!toggleInfo);
              }}
              tooltip={{ text: "how-to", position: "center" }}
            />
          </div>

          <Divider />

          {config.compositions.map((item, i) => {
            return (
              <CompositionSet
                key={`${item.pluginID}`}
                pluginID={item.pluginID}
                name={item.name}
                direction={item.direction}
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
      </div>
    </OnBoardProvider.Provider>
  );
};

export default App;
