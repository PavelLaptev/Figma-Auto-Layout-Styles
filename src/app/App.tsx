import * as React from "react";
import styles from "./app.module.scss";

import {
  generateRandomID,
  downloadJSON,
  getRandomKey,
  checkAndUpdateStructure
} from "../utils";
import { configStorageKey } from "../shareable/variables";

import Button from "./components/Button";
import LayoutCard from "./components/LayoutCard";
import LayoutSet from "./components/LayoutSet";
import Input from "./components/Input";
import Divider from "./components/Divider";

///////////////////////////////////////////////
///////////////// APPLICATION /////////////////
///////////////////////////////////////////////
const App = ({}) => {
  const [appKey, setAppKey] = React.useState(getRandomKey());
  const [config, setConfig] = React.useState({
    about: {
      version: "1.0.5",
      name: "My Config"
    },
    layouts: [
      {
        pluginID: "01",
        name: "Small Layout",
        direction: "VERTICAL",
        hookName: "🐍051j",
        description: "For text elements",
        lock: false,
        fold: false,
        space: {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          between: 16
        }
      } as LayoutTypes,
      {
        pluginID: "02",
        name: "Medium Layout",
        direction: "VERTICAL",
        hookName: "🐚rg4i",
        description: "For medium layouts - between components",
        lock: true,
        fold: false,
        space: {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          between: 24
        }
      } as LayoutTypes,
      {
        pluginID: "03",
        name: "Large Layout",
        direction: "VERTICAL",
        hookName: "🐸hn56",
        description: "For components compositions",
        lock: false,
        fold: false,
        space: {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          between: 32
        }
      } as LayoutTypes
    ]
  } as ConfigTypes);

  ///////////////////////////////////////////////
  /////////////// ADD NEW LAYOUT ////////////////
  ///////////////////////////////////////////////

  const handleNewLayout = () => {
    let uniqueID = generateRandomID();

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
          fold: false,
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
  ///////////// RECORD CONFIG FILE //////////////
  ///////////////////////////////////////////////
  const recordConfigToStorage = config => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "record-config",
          data: config
        }
      },
      "*"
    );
  };

  ///////////////////////////////////////////////
  ////////// HANDLE SAVE CONFIG FILE ////////////
  ///////////////////////////////////////////////
  const handleSaveConfigFile = () => {
    downloadJSON(config, `${config.about.name}.json`, "application/json");
  };

  ///////////////////////////////////////////////
  ////////// HANDLE UPLOAD CONFIG FILE //////////
  ///////////////////////////////////////////////
  const handleUploadConfigFile = e => {
    let reader = new FileReader();
    reader.readAsText(e.target.files[0]);

    reader.onload = () => {
      let result = JSON.parse(reader.result as string);
      let updatedStructureFile = checkAndUpdateStructure(result);

      recordConfigToStorage(updatedStructureFile);
      setConfig(updatedStructureFile);
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

  const handleClearStorage = () => {
    setAppKey(getRandomKey());
    parent.postMessage(
      {
        pluginMessage: {
          type: "clear-stoorage"
        }
      },
      "*"
    );
  };

  ///////////////////////////////////////////////
  ////// BLUR FOCUS WHEN HIT ENTER BUTTON ///////
  ///////////////////////////////////////////////
  const handleKeyPress = e => {
    if (e.charCode === 13) {
      e.target.blur();
    }
  };

  //////////////////////////////////////////////
  ///////////////// USE EFFECT /////////////////
  //////////////////////////////////////////////
  React.useEffect(() => {
    onmessage = event => {
      if (
        event.data.pluginMessage.data &&
        event.data.pluginMessage.type === configStorageKey
      ) {
        setConfig(JSON.parse(event.data.pluginMessage.data));
        setAppKey(getRandomKey());
      }
    };
  }, [appKey]);

  //////////////////////////////////////////////
  /////////////////// RENDER ///////////////////
  //////////////////////////////////////////////

  return (
    <div className={styles.app} key={appKey} onKeyPress={handleKeyPress}>
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
            recordConfigToStorage(config);
          }}
        />
        <Button
          icon={"upload"}
          type="file"
          contentWidth
          onFileChange={handleUploadConfigFile}
          tooltip={{ text: "add from folder", position: "center" }}
        />
        <Button
          icon={"save"}
          contentWidth
          onClick={handleSaveConfigFile}
          tooltip={{ text: "save config", position: "center" }}
        />
        <a
          href="https://github.com/PavelLaptev/Figma-Auto-Layout-Styles"
          target="_blank"
        >
          <Button
            icon={"info"}
            contentWidth
            tooltip={{ text: "how-to", position: "center" }}
          />
        </a>
      </div>

      {config.layouts.map((item, i) => {
        return (
          <LayoutSet
            key={item.pluginID}
            pluginID={item.pluginID}
            name={item.name}
            direction={item.direction}
            hookName={item.hookName}
            description={item.description}
            lock={item.lock}
            fold={item.fold}
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
              recordConfigToStorage(config);
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
              recordConfigToStorage(config);
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

      <Divider />

      <Button
        icon="bin"
        text="Clear plugin storage"
        onClick={handleClearStorage}
      />
    </div>
  );
};

export default App;
