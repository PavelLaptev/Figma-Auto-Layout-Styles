import * as React from "react";
import styles from "./app.module.scss";

import { generateRandomID, downloadJSON, getRandomKey } from "../utils";

import Button from "./components/Button";
import LayoutCard from "./components/LayoutCard";
import LayoutSet from "./components/LayoutSet";
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
    layouts: [
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
      } as LayoutTypes,
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
      } as LayoutTypes,
      {
        pluginID: getRandomKey(),
        name: "Large Layout",
        direction: "VERTICAL",
        hookName: "🐻CompL",
        description: "For large Layouts - like blocks of components",
        lock: false,
        space: {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          between: 32
        }
      } as LayoutTypes,
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
      } as LayoutTypes
    ]
  } as ConfigTypes);

  ///////////////////////////////////////////////
  ///////////// ADD NEW Layout /////////////
  ///////////////////////////////////////////////
  let uniqueID = generateRandomID();
  const handleNewLayout = () => {
    setConfig({
      ...config,
      layouts: [
        ...config.layouts,
        {
          pluginID: getRandomKey(),
          name: `New Layout ${uniqueID}`,
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
        } as LayoutTypes
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
      if (result.compositions) {
        alert(
          `Please rename "compositions" key in JSON file to "layouts" and try again. Sorry for inconvenience 🙏`
        );
        parent.postMessage(
          {
            pluginMessage: {
              type: "close-plugin"
            }
          },
          "*"
        );
      }

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

  const handleKeyPress = e => {
    if (e.charCode === 13) {
      e.target.blur();
    }
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
        <div key={appKey} onKeyPress={handleKeyPress}>
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
                  layouts: config.layouts
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

          {config.layouts.map((item, i) => {
            return (
              <LayoutSet
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
                    layouts: config.layouts.filter(value => {
                      return value !== item;
                    })
                  });
                }}
                onChange={data => {
                  // UPDATE THE STATE
                  // https://stackoverflow.com/questions/39889009/replace-object-in-array-on-react-state
                  let updatedlayouts = config.layouts;
                  // console.log(updatedLayouts[i]);
                  updatedlayouts[i] = data;

                  setConfig({
                    ...config,
                    layouts: updatedlayouts
                  });
                }}
              />
            );
          })}
          <LayoutCard>
            <Button
              icon="plus"
              onClick={handleNewLayout}
              tooltip={{ text: "add new Layout", position: "center" }}
            />
          </LayoutCard>

          <Divider />

          <LayoutCard>
            <Button
              icon="update"
              text="Update all by hooks"
              lightStyle
              onClick={handleUpdateAll}
            />
          </LayoutCard>
        </div>
      </div>
    </OnBoardProvider.Provider>
  );
};

export default App;
