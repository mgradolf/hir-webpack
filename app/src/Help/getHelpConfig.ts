// import axios from "axios"
import HelpConfig from "~/Help/helpConfig.json"
// import { baseURL } from "@packages/api/lib/utils/ApiMethodFactory"

const helpConfig: { [key: string]: string } = HelpConfig
export const getHelpConfig = (helpKey?: string): Promise<string | undefined> => {
  if (!helpKey) return Promise.resolve(undefined)
  return Promise.resolve(helpConfig[helpKey])
  // const url = "/webconfig/Config/helpConfig.json"
  // return axios
  //   .request({ baseURL, url })
  //   .then((x) => {
  //     if (x.data) {
  //       helpConfig = { ...helpConfig, ...x.data }
  //     }
  //     console.log("helpConfig Populated", helpKey, helpConfig[helpKey], helpConfig)
  //     return helpConfig[helpKey]
  //   })
  //   .catch((error) => {
  //     return helpConfig[helpKey]
  //   })
}
