import { DATE_PICKERS, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"

const meta: IFilterField[] = [
  {
    label: "Organization Name",
    inputType: TEXT,
    fieldName: "OrganizationName"
  },
  {
    label: "Payment Due Date",
    inputType: DATE_PICKERS,

    fieldName: "PaymentDueDate",

    fieldName2: "PaymentDueDate1"
  }
]

export default meta

// OrganizationName
// OrganizationName1
// PaymentDueDate
// PaymentDueDate1
