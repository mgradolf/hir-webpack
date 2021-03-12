import { IField } from "~/Component/Common/Form/common"

export interface IReportMeta {
  meta: IField[]
  initialFormValue?: { [key: string]: any }
  defaultFormValue?: { [key: string]: any }
  mapping?: { [key: string]: any }
  atLeastOneRequiredfield?: boolean
}
