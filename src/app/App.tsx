import * as React from "react";
// import appstyles from "./app.module.scss";
import CompositionSet from "./components/CompositionSet";

// Application
const App = ({}) => {
  const [config, setConfig] = React.useState([
    {
      name: "Composition S",
      space: {
        top: 16,
        left: 0,
        bottom: 16,
        right: 0
      }
    },
    {
      name: "Composition M",
      space: {
        top: 40,
        left: 20,
        bottom: 28,
        right: 28
      }
    }
  ]);

  ////////////////////////////////////////////////////////////////
  //////////////////////////// RENDER ////////////////////////////
  ////////////////////////////////////////////////////////////////
  const handleNewComposition = () => {
    parent.postMessage({ pluginMessage: { type: "apply" } }, "*");
  };

  const handleApply = item => {
    console.log(item.space);
  };

  return (
    <div>
      <h1>Layout</h1>
      <hr />

      {config.map((item, i) => {
        return (
          <CompositionSet
            key={item.name}
            name={item.name}
            space={{
              top: item.space.top,
              right: item.space.right,
              bottom: item.space.bottom,
              left: item.space.left
            }}
            onClick={() => handleApply(item)}
            onChange={data => {
              console.log({
                ...config,
                [i]: { ...data }
              });
            }}
          />
        );
      })}

      <button onClick={handleNewComposition}>Add new composition</button>
    </div>
  );
};

export default App;
