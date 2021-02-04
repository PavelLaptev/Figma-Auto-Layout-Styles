import * as React from "react";
// import appstyles from "./app.module.scss";

// Application
const App = ({}) => {
  ////////////////////////////////////////////////////////////////
  //////////////////////////// RENDER ////////////////////////////
  ////////////////////////////////////////////////////////////////
  const handleApply = () => {
    parent.postMessage({ pluginMessage: { type: "apply" } }, "*");
  };

  return (
    <div>
      <button onClick={handleApply}>Apply</button>
    </div>
  );
};

export default App;
