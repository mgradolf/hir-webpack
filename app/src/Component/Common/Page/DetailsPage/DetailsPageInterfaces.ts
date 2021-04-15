import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"

export interface IDetailsSummary {
  summary: CardContainer[]
  actions?: JSX.Element[]
}

export type CardContents = {
  label: string
  value?: any
  cssClass?: string
  jsx?: JSX.Element
  render?: (text: any) => string | JSX.Element
}

export type CardContainer = {
  title?: string
  contents?: CardContents[]
  cardActions?: JSX.Element[]
  groupedContents?: CardContainer[]
}
// ================================================
export interface IStandardDetailsPage {
  getDetailsMeta: (Params: any) => CardContainer[]
  getDetailsFunc?: () => Promise<IApiResponse>
  dataLoaded?: { [key: string]: any }
  cardActions?: JSX.Element[]
  actions?: JSX.Element[]
}
// ================================================

type DetailsTabType = "CardContainer" | "Table"
export interface ITabMeta {
  tabType: DetailsTabType
}

export interface IDetailsTabCardContainerMeta extends ITabMeta {
  getDetailsMeta: (Params: any) => CardContainer[]
  getDetailsFunc: () => Promise<IApiResponse>
  actions?: JSX.Element[]
}

export interface IDetailsTabTableMeta extends ITabMeta {
  description?: JSX.Element | string
  columns: TableColumnType
  searchFunc: () => Promise<IApiResponse>
  actions?: JSX.Element[]
}

type DetailsTab = IDetailsTabTableMeta | IDetailsTabCardContainerMeta | JSX.Element

export interface IStandardDetailsPageWithTab {
  tabMeta: DetailsTab[]
}
