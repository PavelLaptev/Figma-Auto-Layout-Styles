import { log, sortNodesByPosition } from "../utils";

////////////////////////////////////////////////////////////////
///////////////////////// UI CONFIG ////////////////////////////
////////////////////////////////////////////////////////////////

// Show UI
figma.showUI(__html__, { width: 360, height: 500 });

////////////////////////////////////////////////////////////////
///////////////////////// ON MESSAGE ///////////////////////////
////////////////////////////////////////////////////////////////

const setCompositionProps = (frame, data) => {
  frame.name = `${data.hookName}`;
  frame.paddingTop = data.space.top;
  frame.paddingRight = data.space.right;
  frame.paddingBottom = data.space.bottom;
  frame.paddingLeft = data.space.left;
  frame.itemSpacing = data.space.between;
};

figma.ui.onmessage = async msg => {
  let node = figma.currentPage.selection;

  // UPDATE ON BY ONE
  if (msg.type === "apply-composition") {
    //////////////////////////////////////////////////
    /////// IF SELECTED MORE THAN TWO ELEMENTS ///////
    //////////////////////////////////////////////////
    if (node.length > 1) {
      let parentConteiner = node[0].parent;

      // SET FRAME
      let frame = figma.createFrame();
      //
      const group = figma.group(node, parentConteiner);
      frame.x = group.x;
      frame.y = group.y;
      // SET AUTO-LAYOUT AND SIZE
      frame.layoutMode = "VERTICAL";
      frame.resize(group.width, group.height);
      frame.primaryAxisSizingMode = "AUTO";
      // frame.primaryAxisSizingMode = "AUTO";
      // SET SPASING
      setCompositionProps(frame, msg.data);

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
        setCompositionProps(frame, msg.data);
      }
    } else {
      log.error("Please select at least two blocks");
    }
  }

  // UPDTE ALLL BY HOOKS
  if (msg.type === "update-all") {
    log.success("Updating all compositions");
    let allPages = figma.root.children;
    allPages.map(page => {
      msg.data.compositions.map(compositionData => {
        let compositions = page.findAll(
          n => n.name === compositionData.hookName
        );
        compositions.map(compositionFrame => {
          setCompositionProps(compositionFrame, compositionData);
        });
      });
    });
  }
};
