import { getCountries } from "~/ApiServices/Service/RefLookupService"
import { BOOLEAN, DROPDOWN, IField, NUMBER, TEXT } from "~/Component/Common/Form/common"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"

export const FormMeta: IField[] = [
  {
    label: "RegionCode",
    fieldName: "Name",
    inputType: TEXT
  },
  {
    label: "Description",
    fieldName: "Description",
    inputType: TEXT
  },
  {
    label: "IPEDS Code",
    fieldName: "IPEDSCode",
    inputType: TEXT
  },
  {
    label: "CountryCode",
    inputType: DROPDOWN,
    fieldName: "CountryCodeID",
    refLookupService: getCountries,
    displayKey: "Name",
    valueKey: "ID"
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
  }
]

export const columns: TableColumnType = [
  {
    title: "ID",
    dataIndex: "ID"
  },
  { title: "RegionCode", dataIndex: "Name" },
  { title: "Description", dataIndex: "Description" },
  { title: "IPEDS Code", dataIndex: "IPEDSCode" },
  { title: "CountryCode", dataIndex: "CountryCodeID" },
  { title: "Sort Position", dataIndex: "SortPosition" },
  { title: "Is Active", dataIndex: "IsActive", render: renderBoolean }
]
