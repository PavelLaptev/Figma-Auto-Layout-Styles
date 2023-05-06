interface LayoutTypes {
  pluginID: string
  name: string
  direction: 'VERTICAL' | 'HORIZONTAL'
  hookName: string
  description: string
  lock: boolean
  fold: boolean
  space: {
    top: number
    right: number
    bottom: number
    left: number
    between: number
  }
}

interface ConfigTypes {
  about: {
    version: string
    name: string
  }
  settings: {
    autosave: boolean
  }
  layouts: Array<LayoutTypes>
}
