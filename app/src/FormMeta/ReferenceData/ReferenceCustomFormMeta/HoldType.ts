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
    label: "SortPosition",
    fieldName: "SortPosition",
    inputType: NUMBER
  },
  {
    label: "Start Date Flag",
    fieldName: "StartDateFlag",
    inputType: DROPDOWN,
    options: [
      { label: "Disabled", value: 1 },
      { label: "Optional", value: 2 },
      { label: "Mandatory", value: 3 }
    ]
  },
  {
    label: "Release Date Flag",
    fieldName: "ReleaseDateFlag",
    inputType: DROPDOWN,
    options: [
      { label: "Disabled", value: 1 },
      { label: "Optional", value: 2 },
      { label: "Mandatory", value: 3 }
    ]
  },
  {
    label: "Is Active",
    fieldName: "IsActive",
    inputType: BOOLEAN
  }
]

export const columns: TableColumnType = [
  {
    title: "ID",
    dataIndex: "ID"
  },
  { title: "Name", dataIndex: "Name" },
  { title: "Description", dataIndex: "Description" },
  { title: "Sort Position", dataIndex: "SortPosition" },
  { title: "Start Date Flag", dataIndex: "StartDateFlag" },
  { title: "Release Date Flag", dataIndex: "ReleaseDateFlag" },
  { title: "Is Active", dataIndex: "IsActive", render: renderBoolean }
]
