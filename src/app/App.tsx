import * as React from "react";
// import appstyles from "./app.module.scss";
import CompositionSet from "./components/CompositionSet";

// Application
const App = ({}) => {
  const [config, setConfig] = React.useState([
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
    } as ConfigTypes,
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
    } as ConfigTypes,
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
    } as ConfigTypes
  ]);

  ////////////////////////////////////////////////////////////////
  //////////////////////////// RENDER ////////////////////////////
  ////////////////////////////////////////////////////////////////
  const handleNewComposition = () => {
    parent.postMessage({ pluginMessage: { type: "apply" } }, "*");
  };

  return (
    <div>
      <h2>Compositions</h2>
      {config.map((item, i) => {
        return (
          <CompositionSet
            key={item.name}
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

      <button onClick={handleNewComposition}>Update all by hooks</button>
    </div>
  );
};

export default App;
