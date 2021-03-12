import moment from "moment"
import { getOrganizationByType } from "~/ApiServices/BizApi/org/orgIf"
import { getPaymentGatewayAccounts, getPaymentTypes } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, MULTI_SELECT_DROPDOWN, TEXT, IField } from "~/Component/Common/Form/common"
import { IReportMeta } from "~/Pages/Reporting/Report/ReportMetaInterface"
import { DATE_FORMAT } from "~/utils/Constants"

const meta: IField[] = [
  {
    label: "Select Date",
    fieldName: "BeginDate",
    fieldName2: "EndDate",
    rules: [{ required: true, message: "Date field is Required" }],
    inputType: DATE_PICKERS
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    fieldName: "OrganizationID",
    refLookupService: getOrganizationByType,
    displayKey: "Name",
    valueKey: "OrganizationTypeID"
  },
  {
    label: "User",
    inputType: TEXT,
    fieldName: "UserName"
  },
  {
    label: "Payment Gateway",
    inputType: DROPDOWN,
    fieldName: "PaymentGatewayAccountID",
    refLookupService: getPaymentGatewayAccounts,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Deposit Type",
    inputType: MULTI_SELECT_DROPDOWN,
    fieldName: "PaymentTypeID",
    refLookupService: getPaymentTypes,
    displayKey: "PaymentAcceptedName",
    valueKey: "PaymentTypeID"
  }
]

const reportMeta: IReportMeta = {
  meta,
  mapping: {
    UserName: "CreatedBy"
  },
  initialFormValue: {
    BeginDate: moment().add(-1, "day").format(DATE_FORMAT),
    EndDate: moment().format(DATE_FORMAT)
  }
}

export default reportMeta
