import axios from "axios"
import HelpConfig from "~/Help/MhelpConfig.json"
import { baseURL } from "@packages/api/lib/utils/ApiMethodFactory"

let MergedHelpConfig: { [key: string]: string } = {}
export const getHelpConfig = (helpKey?: string): Promise<string | undefined> => {
  if (!helpKey) return Promise.resolve(undefined)

  console.log("MergedHelpConfig ", MergedHelpConfig)
  if (!!MergedHelpConfig[helpKey]) return Promise.resolve(MergedHelpConfig[helpKey])

  const helpConfig: { [key: string]: string } = HelpConfig
  const url = "/webconfig/Config/helpConfig.json"
  return axios
    .request({ baseURL, url })
    .then((x) => {
      if (x.data) {
        x.data = { ...helpConfig, ...x.data }
      } else {
        x.data = helpConfig
      }
      MergedHelpConfig = x.data
      console.log("MergedHelpConfig Populated", MergedHelpConfig)

      return x.data[helpKey]
    })
    .catch((error) => {
      return helpConfig[helpKey]
    })
}
