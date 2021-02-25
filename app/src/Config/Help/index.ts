import axios from "axios"
import HelpConfig from "~/Config/Help/HelpConfig.json"

export interface IHelpConfig {
  generic?: string
  offering?: string
  section?: string
  person?: string
}

export const getHelpConfig = (): Promise<IHelpConfig> => {
  const url = "http://127.0.0.1:8081/HelpConfig.json"
  // const url =  "/webconfig/HelpFileMap.json"

  return axios.request({ url }).then((x) => {
    if (x.data) {
      x.data = { ...HelpConfig, ...x.data } as IHelpConfig
    } else {
      x.data = HelpConfig
    }
    return x.data
  })
}
