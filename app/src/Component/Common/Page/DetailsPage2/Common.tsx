import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsCustomTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsCustomTab"
import { IDetailsSearchTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsSearchTab"
import { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"

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
  tabMeta?: IDetailsTableTabProp | IDetailsSummary | IDetailsSearchTabProp | IDetailsCustomTabProp // | any
  multipleTabMetas?: IDetailsTabMeta[]
  actions?: JSX.Element[]
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
  refreshEventName?: string
}
