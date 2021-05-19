import { getOrganizations } from "~/ApiServices/Service/RefLookupService"
import { CUSTOM_FIELD, DATE_PICKERS, DROPDOWN, IField, NUMBER, TEXT } from "~/Component/Common/Form/common"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"
import { ProgramLookup } from "~/Component/Common/Form/FormLookupFields/ProgramLookup"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"
import { StudentLookup } from "~/Component/Common/Form/FormLookupFields/StudentLookup"

export const OrderItemsSearchMetaForPayment: IField[] = [
  {
    label: "Balance More Than",
    fieldName: "BalanceMoreThan",
    inputType: NUMBER
  },
  {
    label: "Purchaser",
    fieldName: "PersonID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: PersonLookup
  },
  {
    label: "Student",
    fieldName: "StudentID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: StudentLookup
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    fieldName: "OrganizationID",
    ariaLabel: "Department Select",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
  },
  {
    label: "Order ID",
    fieldName: "OrderID",
    inputType: TEXT
  },
  {
    label: "Payment Due Date",
    fieldName: "PaymentDueDateTo",
    fieldName2: "PaymentDueDateFrom",
    inputType: DATE_PICKERS
  },
  {
    label: "OrderDateTo",
    fieldName: "OrderDateTo",
    fieldName2: "OrderDateFrom",
    inputType: DATE_PICKERS
  },
  // {
  //   label: "DepartmentID",
  //   fieldName: "DepartmentID",
  //   inputType: TEXT
  // },
  {
    label: "OptionalItem",
    fieldName: "OptionalItem",
    inputType: TEXT
  },
  {
    label: "SectionID",
    fieldName: "SectionID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SectionLookup
  },
  {
    label: "ProgramID",
    fieldName: "ProgramID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: ProgramLookup
  }
]
