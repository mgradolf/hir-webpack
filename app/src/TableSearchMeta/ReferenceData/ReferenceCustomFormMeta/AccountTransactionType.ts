import { getGLAccountTypes } from "~/ApiServices/Service/RefLookupService"
import { BOOLEAN, DROPDOWN, IField, NUMBER, TEXT } from "~/Component/Common/Form/common"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"

export const FormMeta: IField[] = [
  {
    label: "Name",
    fieldName: "Name",
    inputType: TEXT
  },
  {
    label: "Description",
    fieldName: "Description",
    inputType: TEXT
  },
  {
    label: "Is Active",
    fieldName: "IsActive",
    inputType: BOOLEAN
  },
  {
    label: "SortPosition",
    fieldName: "SortPosition",
    inputType: NUMBER
  },
  {
    label: "Base Type Code",
    fieldName: "BaseType",
    inputType: DROPDOWN,
    options: [
      { label: "Deposit", value: 1 },
      { label: "Withdraw", value: 2 },
      { label: "Transfer", value: 3 }
    ]
  },
  {
    label: "GL Account",
    fieldName: "GLAccountID",
    inputType: DROPDOWN,
    refLookupService: getGLAccountTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Require Reference No",
    fieldName: "RequireReferenceNo",
    inputType: BOOLEAN
  },
  {
    label: "Internal Only",
    fieldName: "IsInternalOnly",
    inputType: BOOLEAN
  }
]

export const columns: TableColumnType = [
  {
    title: "ID",
    dataIndex: "ID"
  },
  {
    title: "GL Account",
    dataIndex: "GLAccountID"
  },

  { title: "Name", dataIndex: "Name" },
  { title: "Description", dataIndex: "Description" },

  { title: "Sort Position", dataIndex: "SortPosition" },
  { title: "Is Active", dataIndex: "IsActive", render: renderBoolean },
  { title: "Base Type Code", dataIndex: "BaseType" },
  { title: "Require Reference No", dataIndex: "RequireReferenceNo" },
  { title: "Internal Only", dataIndex: "IsInternalOnly" }
]
