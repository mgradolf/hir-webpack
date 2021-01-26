import { IField } from "~/Component/Common/SearchForm/common"

export interface IReportMeta {
  meta: IField[]
  defaultFilter?: { [key: string]: any }
  mapping?: { [key: string]: any }
}
