import { IField } from "~/Component/Common/SearchFilters/SearchForm/common"

export interface IReportMeta {
  meta: IField[]
  defaultFilter?: { [key: string]: any }
  mapping?: { [key: string]: any }
}
