import { log, sortNodesByPosition } from "../utils";

////////////////////////////////////////////////////////////////
///////////////////////// UI CONFIG ////////////////////////////
////////////////////////////////////////////////////////////////

// Show UI
figma.showUI(__html__, { width: 360, height: 600 });

////////////////////////////////////////////////////////////////
///////////////////////// ON MESSAGE ///////////////////////////
////////////////////////////////////////////////////////////////

const setCompositionProps = (
  frame,
  data: CompositionTypes,
  skipAxisMode: boolean = false
) => {
  frame.name = `${data.hookName}`;
  frame.layoutMode = data.direction;

  if (!skipAxisMode) {
    frame.primaryAxisSizingMode =
      data.direction === "HORIZONTAL" ? "FIXED" : "AUTO";
    frame.counterAxisSizingMode =
      data.direction === "VERTICAL" ? "FIXED" : "AUTO";
  }

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
    // console.log(msg.data);

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
      frame.backgrounds = [];
      frame.resize(group.width, group.height);

      // SET SPASING
      setCompositionProps(frame, msg.data);

      // ADD CHILDREN ONE BY ONE TO THE NEW FRAME
      let sortedNodes = sortNodesByPosition(node);
      sortedNodes.map(item => {
        console.log(item.width);
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
      if (node[0].layoutMode !== "NONE") {
        let frame = node[0];
        setCompositionProps(frame, msg.data, true);
      }
    } else {
      log.error("Please select at least two blocks");
    }
  }

  // UPDTE ALLL BY HOOKS
  if (msg.type === "update-all") {
    let page = figma.currentPage;

    msg.data.compositions.map(compositionData => {
      log.success(`Updating all compositions`);
      let compositions = page.findAll(n => n.name === compositionData.hookName);

      if (compositions.length !== 0) {
        compositions.map(compositionFrame => {
          setCompositionProps(compositionFrame, compositionData);
        });
      }
    });
  }
};
