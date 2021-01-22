import { BOOLEAN, IField, TEXT } from "~/Component/Common/SearchFilters/SearchForm/common"
import { IReportMeta } from "~/Pages/Discovery/Report/IReportMeta"

const meta: IField[] = [
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
