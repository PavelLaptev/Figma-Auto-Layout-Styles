interface LayoutTypes {
  pluginID: string;
  name: string;
  direction: "VERTICAL" | "HORIZONTAL";
  hookName: string;
  description: string;
  lock: boolean;
  fold: boolean;
  primaryAxisAlignItems: "MIN" | "CENTER" | "MAX" | "SPACE-BETWEEN";
  space: {
    top: number;
    right: number;
    bottom: number;
    left: number;
    between: number;
  };
}

interface ConfigTypes {
  about: {
    version: string;
    name: string;
  };
  layouts: Array<LayoutTypes>;
}
