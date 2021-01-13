import { DATE_PICKERS, DROPDOWN, IFilterField } from "~/Component/Common/SearchFilters/common"

const meta: IFilterField[] = [
  {
    label: "Order Date",
    fieldName: "OrderDateFrom",
    fieldName2: "OrderDateTo",
    inputType: DATE_PICKERS
  },
  {
    label: "Sort By",
    inputType: DROPDOWN,
    fieldName: "SortByColumn",
    options: [
      { label: "Section Number", value: "SortSectionNumber" },
      { label: "Organization", value: "SortOrganization" },
      { label: "Seat Sold", value: "SortQuantity" },
      { label: "Sale Amount", value: "SortAmount" },
      { label: "Section Enrollment Date", value: "SortFinalEnrollmentDate" }
    ]
  },
  {
    label: "Sort Order",
    inputType: DROPDOWN,
    fieldName: "SortOrder",
    options: [
      { label: "ascending", value: "Asc" },
      { label: "descending", value: "Desc" }
    ]
  }
]

export const mapping: { [key: string]: any } = {
  OrderDateFrom: "OrderDateFrom_DisplayOnly",
  OrderDateTo: "OrderDateTo_DisplayOnly"
}

export default meta
