import { getOPCStatusCode, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterField, NUMBER, TEXT } from "~/Component/Common/SearchFilters/common"
import PersonSelectorForOrderManagement from "~/Component/Section/Order/OrderManagementFilters/PersonSelector"
import DateTypelectorForOrderManagement from "~/Component/Section/Order/OrderManagementFilters/DateTypelector"
import TotalAmountRangeForOrderManagement from "~/Component/Section/Order/OrderManagementFilters/TotalAmountRange"
import AccountLookupForOrderManagement from "~/Component/Section/Order/OrderManagementFilters/AccountLookup"

// const Params = {
//   SectionIDs: [9],

//   PersonID: 14269,
//   StudentName: "ABC*",
//   BilledPersonName: "ABC*",

//   CreateDateTo: "2018-09-07T06:39:04+06:00",
//   CreateDateFrom: "2016-09-07T06:39:04+06:00",

//   PaymentDueDateTo: "2018-09-07T06:39:04+06:00",
//   PaymentDueDateFrom: "2016-09-07T06:39:04+06:00",

//   TotalAmountFrom: 0.0,
//   TotalAmountTo: 10000.0,

//   OrderID: 19431,
//   OrderStatusID: 0,
//   HasPO: false,

//   SourceID: 0,
//   AccountID: 0,
//   ProductName: "SAD*"
// }

export const OrderManagementSearchFilterMeta: IFilterField[] = [
  {
    label: "Person Selector",
    fieldName: "",
    customFilterComponent: PersonSelectorForOrderManagement
  },
  {
    label: "Date Type Selector",
    fieldName: "",
    customFilterComponent: DateTypelectorForOrderManagement
  },
  {
    label: "Total Amount",
    fieldName: "",
    customFilterComponent: TotalAmountRangeForOrderManagement
  },
  {
    label: "Order Id",
    inputType: NUMBER,
    defaultValue: "",
    fieldName: "OrderID",
    ariaLabel: "OrderID"
  },
  {
    label: "Order Status",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "OrderStatusID",
    ariaLabel: "Order Status",
    refLookupService: getOPCStatusCode,
    displayKey: "Name",
    valueKey: "StatusID"
  },
  {
    label: "Source",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "SourceID",
    ariaLabel: "Source",
    refLookupService: getSourceModule,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Product Name",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "ProductName",
    ariaLabel: "ProductName"
  },
  {
    label: "Account Lookup",
    fieldName: "",
    customFilterComponent: AccountLookupForOrderManagement
  }
]
