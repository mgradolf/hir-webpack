import axios from "axios"
import { baseURL } from "@packages/api/lib/utils/ApiMethodFactory"
import { TableColumnType } from "."

export interface IUserTableMetaConfig {
  hidden?: string
  columnPosition?: number
  title?: string
  defaultSortOrder?: "descend" | "ascend" | null
}

async function getUserTableMetaConfig(tableName?: string): Promise<{ [key: string]: any }> {
  let userFormMeta: { [key: string]: any } = {}
  if (!tableName) return Promise.resolve({})
  try {
    const _fileMap = (await axios.request({ baseURL, url: `/webconfig/Config/fileMap.json` })).data
    if (_fileMap && _fileMap[tableName]) {
      userFormMeta = (await axios.request({ baseURL, url: `/webconfig${_fileMap[tableName]}` })).data
      console.log("table user config  ", userFormMeta)
    }
  } catch (error) {
    console.error("table user config error ", error)
  }

  if (userFormMeta && Object.keys(userFormMeta).length > 0) {
    Object.keys(userFormMeta).forEach((key: string) => {
      const config = userFormMeta[key]
      if (
        !(
          ("title" in config && typeof config["title"] === "string") ||
          ("columnPosition" in config && typeof config["columnPosition"] === "number") ||
          ("defaultSortOrder" in config &&
            (config["defaultSortOrder"] === "descend" ||
              config["defaultSortOrder"] === "ascend" ||
              config["defaultSortOrder"] === null)) ||
          ("hidden" in config && typeof config["hidden"] === "boolean")
        )
      ) {
        console.log("deleting this invalid key ", key, userFormMeta[key])
        delete userFormMeta[key]
      }
    })
  }
  return Promise.resolve(userFormMeta)
}

function TableMetaShadowingProcessor(
  columns: TableColumnType,
  userMetaConfig: { [key: string]: any }
): TableColumnType {
  return columns
    .map((x) => {
      if (userMetaConfig && x.dataIndex && typeof x.dataIndex === "string" && userMetaConfig[x.dataIndex]) {
        x = { ...x, ...userMetaConfig[x.dataIndex] }
      }
      if (x.title === "" || !x.title) {
        x.columnPosition = 1
      }
      return x
    })
    .filter((x) => !x.hidden)
    .sort((a, b) => (a.columnPosition || 1000) - (b.columnPosition || 1000))
}

export function processTableMetaWithUserMetaConfig(
  columns: TableColumnType,
  tableName?: string
): Promise<TableColumnType> {
  return getUserTableMetaConfig(tableName).then((x) => TableMetaShadowingProcessor(columns, x))
}
