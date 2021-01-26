import { BOOLEAN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IFilterField[] = [
  {
    label: "Organization Name",
    inputType: TEXT,
    fieldName: "OrganizationName"
  },
  {
    label: "Show Only Overdue Purchase Orders",
    fieldName: "onlyOutstanding",
    inputType: BOOLEAN
  }
]

const reportMeta: IReportMeta = {
  meta,
  mapping: {
    OrganizationName: "OrganizationName1"
  }
}

export default reportMeta
