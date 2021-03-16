import { BOOLEAN, IField, NUMBER, TEXT } from "~/Component/Common/Form/common"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { PAYMENT_POLICY_TYPE } from "~/utils/Constants"

export const FormMeta: IField[] = [
  {
    label: "Name",
    fieldName: "Name",
    inputType: TEXT
  },
  {
    label: "Is Active",
    fieldName: "IsActive",
    inputType: BOOLEAN
  },
  {
    label: "Description",
    fieldName: "Description",
    inputType: TEXT
  },
  {
    label: "SortPosition",
    fieldName: "SortPosition",
    inputType: NUMBER
  }
]

export const columns: TableColumnType = [
  {
    title: "ID",
    dataIndex: "ID"
  },
  { title: "Policy Name", dataIndex: "Name" },
  {
    title: "Policy Type",
    dataIndex: "DateReferenceType",
    render: (text, record) => (typeof text === "number" && text > 0 && text < 5 ? PAYMENT_POLICY_TYPE[text] : text)
  },
  { title: "Policy Definition", dataIndex: "Description" },
  { title: "Sort Position", dataIndex: "SortPosition" },
  { title: "Is Active", dataIndex: "IsActive", render: renderBoolean }
]
