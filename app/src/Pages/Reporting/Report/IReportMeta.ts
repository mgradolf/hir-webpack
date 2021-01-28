import { IField } from "~/Component/Common/Form/common"

export interface IReportMeta {
  meta: IField[]
  defaultFilter?: { [key: string]: any }
  mapping?: { [key: string]: any }
}
