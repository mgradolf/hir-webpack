import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export const tabTypes = {
  summary: "summary",
  table: "table",
  searchtable: "searchtable",
  custom: "custom"
}

type TabType = "summary" | "table" | "searchtable" | "custom"
export interface IDetailsTabMeta {
  tabType: TabType
  tabTitle: string
  tabMeta: any
  multipleTabMetas?: IDetailsTabMeta[]
}

export interface IDetailsMeta {
  pageTitle?: string
  tabs: IDetailsTabMeta[]
}

export interface IDetailsPage {
  getMeta: (Params: any, entityType?: string, entityID?: number) => IDetailsMeta
  getDetails: () => Promise<IApiResponse>
  entityType?: string
  entityID?: number
  titleKey?: string
  actions?: JSX.Element[]
}
