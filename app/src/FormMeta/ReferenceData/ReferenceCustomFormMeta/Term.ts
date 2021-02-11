import { findTermFeeProductsByCategoryID } from "~/ApiServices/BizApi/query/queryIf"
import { getTermType } from "~/ApiServices/Service/RefLookupService"
import { BOOLEAN, DATE_PICKER, DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"
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
    label: "Start Date",
    fieldName: "StartDate",
    inputType: DATE_PICKER
  },
  {
    label: "End Date",
    fieldName: "EndDate",
    inputType: DATE_PICKER
  },
  {
    label: "Term Type",
    inputType: DROPDOWN,
    fieldName: "TermTypeID",
    refLookupService: getTermType,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Term Fee",
    inputType: DROPDOWN,
    fieldName: "TermFeeID",
    refLookupService: () => findTermFeeProductsByCategoryID({ ProductCategoryID: 6 }),
    displayKey: "Name",
    valueKey: "ProductID"
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
  { title: "Term Type", dataIndex: "TermTypeID" },
  { title: "Term Fee", dataIndex: "TermFeeID" },
  { title: "Start Date", dataIndex: "StartDate" },
  { title: "End Date", dataIndex: "EndDate" },
  { title: "Is Active", dataIndex: "IsActive", render: renderBoolean }
]
