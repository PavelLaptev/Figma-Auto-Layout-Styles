import { log, sortNodesByPosition } from "../utils";

////////////////////////////////////////////////////////////////
///////////////////////// UI CONFIG ////////////////////////////
////////////////////////////////////////////////////////////////

// Show UI
figma.showUI(__html__, { width: 340, height: 640 });

////////////////////////////////////////////////////////////////
///////////////////////// ON MESSAGE ///////////////////////////
////////////////////////////////////////////////////////////////

figma.ui.onmessage = async msg => {
  let node = figma.currentPage.selection;

  if (msg.type === "apply-composition") {
    //////////////////////////////////////////////////
    /////// IF SELECTED MORE THAN TWO ELEMENTS ///////
    //////////////////////////////////////////////////
    if (node.length > 1) {
      let parentConteiner = node[0].parent;

      // SET FRAME
      let frame = figma.createFrame();
      frame.name = `${msg.data.hookName}`;
      //
      const group = figma.group(node, parentConteiner);
      frame.x = group.x;
      frame.y = group.y;
      // SET AUTO-LAYOUT AND SIZE
      frame.layoutMode = "VERTICAL";
      frame.resize(group.width, group.height);
      frame.primaryAxisSizingMode = "AUTO";
      // SET SPASING
      frame.paddingTop = msg.data.space.top;
      frame.paddingRight = msg.data.space.right;
      frame.paddingBottom = msg.data.space.bottom;
      frame.paddingLeft = msg.data.space.left;
      frame.itemSpacing = msg.data.space.between;

      // ADD CHILDREN ONE BY ONE TO THE NEW FRAME
      let sortedNodes = sortNodesByPosition(node);
      sortedNodes.map(item => {
        frame.appendChild(item);
      });

      // APPEND NEW FRAME TO THE SAME PAGE
      parentConteiner.appendChild(frame);
      // FOCUS ON THE NEW COMPOSITION
      figma.currentPage.selection = [frame];

      //////////////////////////////////////////////////
      ///// IF SELECTED ONE FRAME WITH AUTO-LAYOUT /////
      //////////////////////////////////////////////////
    } else if (node.length === 1 && node[0].type === "FRAME") {
      if (node[0].layoutMode === "VERTICAL") {
        let frame = node[0];
        frame.primaryAxisSizingMode = "AUTO";
        frame.name = `${msg.data.hookName}`;
        frame.paddingTop = msg.data.space.top;
        frame.paddingRight = msg.data.space.right;
        frame.paddingBottom = msg.data.space.bottom;
        frame.paddingLeft = msg.data.space.left;
        frame.itemSpacing = msg.data.space.between;
      }
    } else {
      log.error("Please select at least two blocks");
    }
  }
};
