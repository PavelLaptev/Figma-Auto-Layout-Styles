interface CompositionTypes {
  name: string;
  hookName: string;
  description: string;
  lock: boolean;
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
  compositions: Array<CompositionTypes>;
}
