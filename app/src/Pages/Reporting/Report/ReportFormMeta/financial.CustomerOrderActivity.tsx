import moment from "moment"
import { DATE_PICKERS, CUSTOM_FIELD, IField } from "~/Component/Common/Form/common"

import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/ReportMetaInterface"
import { DATE_FORMAT } from "~/utils/Constants"

const meta: IField[] = [
  {
    label: "Person",
    fieldName: "PersonID",
    rules: [{ required: true, message: "Person is Required" }],
    inputType: CUSTOM_FIELD,
    customFilterComponent: PersonLookup
  },
  {
    label: "Order Date",
    fieldName: "OrderDateFrom",
    fieldName2: "OrderDateTo",
    rules: [{ required: true, message: "Order Date is Required" }],
    inputType: DATE_PICKERS
  }
]

const reportMeta: IReportMeta = {
  meta,
  initialFormValue: {
    OrderDateFrom: moment().startOf("year").format(DATE_FORMAT),
    OrderDateTo: moment().format(DATE_FORMAT)
  }
}

export default reportMeta
