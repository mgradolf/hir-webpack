import { SearchAccountLookup } from "~/Component/Common/Form/SearchLookups/SearchAccountLookup"
import { CUSTOM_FIELD, IField } from "~/Component/Common/Form/common"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Account",
    fieldName: "AffiliateOrganizationID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchAccountLookup
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
