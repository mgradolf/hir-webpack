import { IFilterField } from "~/Component/Common/SearchFilters/common"

export interface IReportMeta {
  meta: IFilterField[]
  defaultFilter: { [key: string]: any }
  mapping: { [key: string]: any }
}
