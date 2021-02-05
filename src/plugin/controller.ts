import { log } from "../utils";

////////////////////////////////////////////////////////////////
///////////////////////// UI CONFIG ////////////////////////////
////////////////////////////////////////////////////////////////

// Show UI
figma.showUI(__html__, { width: 300, height: 500 });

////////////////////////////////////////////////////////////////
///////////////////////// ON MESSAGE ///////////////////////////
////////////////////////////////////////////////////////////////

figma.ui.onmessage = async msg => {
  let node = figma.currentPage.selection;

  if (msg.type === "apply") {
    if (node.length > 1) {
      console.log(node);
    } else {
      log.error("Please select at least two blocks");
    }
  }
};