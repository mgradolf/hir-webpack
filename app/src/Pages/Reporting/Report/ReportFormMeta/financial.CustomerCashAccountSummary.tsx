import { AccountLookup } from "~/Component/Common/Form/FormLookupFields/AccountLookup"
import { CUSTOM_FIELD, IField } from "~/Component/Common/Form/common"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Account",
    fieldName: "AffiliateOrganizationID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: AccountLookup
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
