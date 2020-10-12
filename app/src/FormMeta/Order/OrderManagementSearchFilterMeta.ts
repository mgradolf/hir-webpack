import { getOPCStatusCode, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterField, NUMBER, TEXT } from "~/Component/Common/SearchFilters/common"
import PersonSelectorForOrderManagement from "~/FormMeta/Order/PersonSelectorForOrderManagement"
import DateTypelectorForOrderManagement from "~/FormMeta/Order/DateTypelectorForOrderManagement"
import TotalAmountRangeForOrderManagement from "~/FormMeta/Order/TotalAmountRangeForOrderManagement"
import AccountLookupForOrderManagement from "~/FormMeta/Order/AccountLookupForOrderManagement"

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

export function OrderManagementSearchFilterMeta(SectionID: number): IFilterField[] {
  return [
    {
      label: "",
      inputType: NUMBER,
      hidden: true,
      defaultValue: SectionID,
      fieldName: "SectionIDs",
      ariaLabel: "SectionIDs"
    },
    {
      inputType: "PERSON_SELECTOR",
      fieldName: "",
      customFilterComponent: PersonSelectorForOrderManagement
    },
    {
      inputType: "DATE_TYPE_SELECTOR",
      fieldName: "",
      customFilterComponent: DateTypelectorForOrderManagement
    },
    {
      inputType: "TOTAL_AMOUNT_RANGE",
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
      inputType: "ACCOUNT_LOOKUP",
      fieldName: "",
      customFilterComponent: AccountLookupForOrderManagement
    }
  ]
}
