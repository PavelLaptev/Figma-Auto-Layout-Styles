////////////////////////////////////////////////////
/////////////////// SMART LOG //////////////////////
////////////////////////////////////////////////////

let logStyles = "border-radius: 4px; padding: 2px 4px;";
let logTime = 800;

const log = {
  success: (text, show = true, timer = logTime) => {
    show
      ? console.log(
          `%c${text}`,
          `background: rgba(0, 255, 136, 0.14);${logStyles}`
        )
      : false;
    figma.notify(`🎉 ${text}`, {
      timeout: timer
    });
  },
  check: (text, show = true, timer = logTime) => {
    show
      ? console.log(
          `%c${text}`,
          `background: rgba(0, 204, 255, 0.14);${logStyles}`
        )
      : false;
    figma.notify(`✅ ${text}`, {
      timeout: timer
    });
  },

  neutral: (text, show = true, timer = logTime) => {
    show
      ? console.log(
          `%c${text}`,
          `background: rgba(128, 128, 128, 0.14);${logStyles}`
        )
      : false;
    figma.notify(`${text}`, {
      timeout: timer
    });
  },
  warn: (text, show = true, timer = logTime) => {
    show
      ? console.log(
          `%c${text}`,
          `background: rgba(255, 123, 0, 0.14);${logStyles}`
        )
      : false;
    figma.notify(`☢️ ${text}`, {
      timeout: timer
    });
  },
  error: (text, show = true, timer = logTime) => {
    show
      ? console.log(`%c${text}`, `background: rgba(255,0,0,0.14);${logStyles}`)
      : false;
    figma.notify(`⛔️ ${text}`, {
      timeout: timer
    });
  }
};

export default log;
