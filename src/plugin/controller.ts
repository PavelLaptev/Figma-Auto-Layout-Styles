import { log, sortNodesByPosition } from "../utils";

////////////////////////////////////////////////////////////////
///////////////////////// UI CONFIG ////////////////////////////
////////////////////////////////////////////////////////////////

// Show UI
figma.showUI(__html__, { width: 360, height: 600 });

////////////////////////////////////////////////////////////////
///////////////////////// ON MESSAGE ///////////////////////////
////////////////////////////////////////////////////////////////

const setLayoutProps = (
  frame,
  data: LayoutTypes,
  skipAxisMode: boolean = false,
  rename: boolean = true
) => {
  frame.name = rename ? `${data.hookName}` : frame.name;
  frame.layoutMode = data.direction;

  if (!skipAxisMode) {
    frame.primaryAxisSizingMode =
      data.direction === "HORIZONTAL" ? frame.primaryAxisSizingMode : "AUTO";
    frame.counterAxisSizingMode =
      data.direction === "VERTICAL" ? frame.counterAxisSizingMode : "AUTO";
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
  if (msg.type === "apply-layout") {
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
      setLayoutProps(frame, msg.data);

      // ADD CHILDREN ONE BY ONE TO THE NEW FRAME
      let sortedNodes = sortNodesByPosition(node);
      sortedNodes.map(item => {
        // console.log(item.width);
        frame.appendChild(item);
      });

      // APPEND NEW FRAME TO THE SAME PAGE
      parentConteiner.appendChild(frame);
      // FOCUS ON THE NEW Layout
      figma.currentPage.selection = [frame];

      //////////////////////////////////////////////////
      ///// IF SELECTED ONE FRAME WITH AUTO-LAYOUT /////
      //////////////////////////////////////////////////
    } else if (
      (node.length === 1 && node[0].type === "FRAME") ||
      (node.length === 1 && node[0].type === "COMPONENT")
    ) {
      let frame = node[0];
      setLayoutProps(frame, msg.data, true);
    } else if (node.length === 1 && node[0].type === "INSTANCE") {
      log.warn("Please select the master component", true, 4000);
    } else {
      log.error("Please select at least two blocks", true, 4000);
    }
  }

  // UPDTE ALLL BY HOOKS
  if (msg.type === "update-all") {
    let page = figma.currentPage;

    msg.data.layouts.map(LayoutData => {
      log.success(`Updating all Layouts`, true, 2000);
      let layouts = page.findAll(n => n.name.includes(LayoutData.hookName));

      if (layouts.length !== 0) {
        layouts.map(LayoutFrame => {
          setLayoutProps(LayoutFrame, LayoutData, false, false);
        });
      }
    });
  }

  if (msg.type === "close-plugin") {
    figma.closePlugin();
  }
};
