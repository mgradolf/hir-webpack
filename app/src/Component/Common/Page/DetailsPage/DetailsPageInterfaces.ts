import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

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
