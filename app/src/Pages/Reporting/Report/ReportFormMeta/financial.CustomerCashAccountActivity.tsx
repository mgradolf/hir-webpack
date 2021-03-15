import moment from "moment"
import { DATE_PICKERS, CUSTOM_FIELD, IField } from "~/Component/Common/Form/common"

import { AccountLookup } from "~/Component/Common/Form/FormLookupFields/AccountLookup"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/ReportMetaInterface"
import { DATE_FORMAT } from "~/utils/Constants"

const meta: IField[] = [
  {
    label: "Account Owner",
    fieldName: "PersonID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: PersonLookup
  },
  {
    label: "Account",
    fieldName: "AffiliateOrganizationID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: AccountLookup
  },
  {
    label: "Select Date",
    inputType: DATE_PICKERS,
    rules: [{ required: true, message: "Date field is Required" }],
    displayKey: "From",
    fieldName: "TxDateFrom",
    valueKey: "FromDate",
    displayKey2: "To",
    fieldName2: "TxDateTo",
    valueKey2: "ToDate"
  }
]

const reportMeta: IReportMeta = {
  meta,
  initialFormValue: {
    TxDateFrom: moment().startOf("year").format(DATE_FORMAT),
    TxDateTo: moment().format(DATE_FORMAT)
  }
}

export default reportMeta
