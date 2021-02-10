import { IField } from "~/Component/Common/Form/common"

export interface IReportMeta {
  meta: IField[]
  defaultFormValue?: { [key: string]: any }
  mapping?: { [key: string]: any }
  atLeastOneRequiredfield?: boolean
}
