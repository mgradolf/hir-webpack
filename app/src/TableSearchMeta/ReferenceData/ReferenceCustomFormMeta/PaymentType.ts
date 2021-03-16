import { getBasePaymentTypes, getGLAccountTypes } from "~/ApiServices/Service/RefLookupService"
import { BOOLEAN, DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"

export const FormMeta: IField[] = [
  {
    label: "Payment Method Name",
    fieldName: "PaymentAcceptedName",
    inputType: TEXT
  },
  {
    label: "GL Account",
    inputType: DROPDOWN,
    fieldName: "GLAccountID",
    refLookupService: getGLAccountTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Payment Base Type",
    inputType: DROPDOWN,
    fieldName: "GLAccountID",
    refLookupService: getBasePaymentTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Is Active",
    fieldName: "IsActive",
    inputType: BOOLEAN
  },
  {
    label: "Is Internal Only",
    fieldName: "IsInternalOnly",
    inputType: BOOLEAN
  }
]

export const columns: TableColumnType = [
  { title: "ID", dataIndex: "ID" },
  { title: "Payment Base Type", dataIndex: "GLAccountID" },
  { title: "Payment Method Name", dataIndex: "PaymentAcceptedName" },
  { title: "GL Account", dataIndex: "GLAccountID" },
  { title: "Is Active", dataIndex: "IsActive", render: renderBoolean },
  { title: "Is Internal Only", dataIndex: "IsInternalOnly" }
]
