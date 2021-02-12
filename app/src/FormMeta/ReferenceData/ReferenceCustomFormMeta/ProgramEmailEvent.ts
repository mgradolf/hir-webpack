import { getSystemEvent } from "~/ApiServices/Service/RefLookupService"
import { BOOLEAN, DROPDOWN, IField, NUMBER, TEXT, TEXTAREA } from "~/Component/Common/Form/common"
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
  },
  {
    label: "System Event",
    inputType: DROPDOWN,
    fieldName: "SystemEventID",
    refLookupService: getSystemEvent,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Component ID",
    fieldName: "ComponentID",
    inputType: TEXT
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
  { title: "Mime Type", dataIndex: "MimeType" },
  { title: "Default Subject", dataIndex: "DefaultSubject" },
  { title: "Default Message", dataIndex: "DefaultMessage" },
  { title: "System Event", dataIndex: "SystemEventID" },
  { title: "ComponentID", dataIndex: "ComponentID" }
]
