import { getMetricType } from "~/ApiServices/Service/RefLookupService"
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
    label: "Metric Type",
    fieldName: "MetricTypeID",
    inputType: DROPDOWN
  },
  {
    label: "Metric Type",
    inputType: DROPDOWN,
    fieldName: "MetricTypeID",
    refLookupService: getMetricType,
    displayKey: "Name",
    valueKey: "ID"
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
  }
]

export const columns: TableColumnType = [
  {
    title: "ID",
    dataIndex: "ID"
  },
  { title: "Name", dataIndex: "Name" },
  { title: "Description", dataIndex: "Description" },
  { title: "Metric Type", dataIndex: "MetricTypeID" },
  { title: "Sort Position", dataIndex: "SortPosition" },
  { title: "Is Active", dataIndex: "IsActive", render: renderBoolean }
]
