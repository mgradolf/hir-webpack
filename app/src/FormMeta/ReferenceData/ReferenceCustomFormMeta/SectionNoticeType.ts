import { BOOLEAN, IField, NUMBER, TEXT, TEXTAREA } from "~/Component/Common/Form/common"
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
    label: "Sort Position",
    fieldName: "SortPosition",
    inputType: NUMBER
  },
  {
    label: "Is Active",
    fieldName: "IsActive",
    inputType: BOOLEAN
  },
  {
    label: "Mime Type",
    fieldName: "DefaultMimeType",
    inputType: TEXT
  },
  {
    label: "Default Subject",
    fieldName: "DefaultSubject",
    inputType: TEXT
  },
  {
    label: "Default Message",
    fieldName: "DefaultMessage",
    inputType: TEXTAREA
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
  { title: "Is Active", dataIndex: "IsActive", render: renderBoolean },
  { title: "Mime Type", dataIndex: "DefaultMimeType" },
  { title: "Default Subject", dataIndex: "DefaultSubject" },
  { title: "Default Message", dataIndex: "DefaultMessage" }
]
