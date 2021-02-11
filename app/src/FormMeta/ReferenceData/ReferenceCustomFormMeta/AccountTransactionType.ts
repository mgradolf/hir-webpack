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
    label: "Base Type",
    fieldName: "BaseType",
    inputType: NUMBER
  },
  {
    label: "GL Account",
    fieldName: "GLAccountID",
    inputType: DROPDOWN,
    refLookupService: getGLAccountTypes
  },
  {
    label: "Require Reference No",
    fieldName: "RequireReferenceNo",
    inputType: DROPDOWN,
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ]
  },
  {
    label: "Internal Only",
    fieldName: "IsInternalOnly",
    inputType: DROPDOWN,
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ]
  }
]

export const columns: TableColumnType = [
  {
    title: "ID",
    dataIndex: "ID"
  },
  {
    title: "Name",
    dataIndex: "Name"
  },
  { title: "Description", dataIndex: "Description" },
  { title: "Active", dataIndex: "IsActive", render: renderBoolean },
  { title: "Sort Position", dataIndex: "SortPosition" }
]
