import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"

export const genericColumns: TableColumnType = [
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
