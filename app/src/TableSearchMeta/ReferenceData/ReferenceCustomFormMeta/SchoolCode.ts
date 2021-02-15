import { BOOLEAN, IField, TEXT } from "~/Component/Common/Form/common"
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
    label: "City",
    fieldName: "City",
    inputType: TEXT
  },
  {
    label: "State/Province",
    fieldName: "State",
    inputType: TEXT
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
  { title: "City", dataIndex: "City" },
  { title: "State/Province", dataIndex: "State" },
  { title: "Is Active", dataIndex: "IsActive", render: renderBoolean }
]
