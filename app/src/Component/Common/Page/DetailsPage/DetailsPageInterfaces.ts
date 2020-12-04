import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"

export type CardContents = {
  label: string
  value?: any
  jsx?: JSX.Element
  render?: (text: any) => string | JSX.Element
}

export type CardContainer = {
  title?: string
  contents?: CardContents[]
  groupedContents?: CardContainer[]
}
// ================================================
export interface IStandardDetailsPage {
  getDetailsMeta: (Params: any) => CardContainer[]
  getDetailsFunc: () => Promise<IApiResponse>
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
