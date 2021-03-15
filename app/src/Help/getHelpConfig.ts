import axios from "axios"
import HelpConfig from "~/Help/HelpConfig.json"
import { baseURL } from "@packages/api/lib/utils/ApiMethodFactory"

export interface IHelpConfig {
  generic?: string
  offering?: string
  section?: string
  person?: string
}

export const getHelpConfig = (): Promise<IHelpConfig> => {
  const url = "/webconfig/Config/Help/HelpConfig.json"
  return axios
    .request({ baseURL, url })
    .then((x) => {
      if (x.data) {
        x.data = { ...HelpConfig, ...x.data } as IHelpConfig
      } else {
        x.data = HelpConfig
      }
      return x.data
    })
    .catch((error) => {
      return HelpConfig as IHelpConfig
    })
}
