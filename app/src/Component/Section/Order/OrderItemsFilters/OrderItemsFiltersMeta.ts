import { getOPCStatusCode, getOrganizations, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterField, NUMBER, TEXT } from "~/Component/Common/SearchFilters/common"
import PersonSelector from "~/Component/Section/Order/OrderItemsFilters/PersonSelector"
import DateTypelector from "~/Component/Section/Order/OrderItemsFilters/DateTypelector"
// import TotalAmountRange from "~/Component/Section/Order/OrderItemsFilters/TotalAmountRange"
import AccountLookup from "~/Component/Section/Order/OrderItemsFilters/AccountLookup"

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

export function OrderItemsFiltersMeta(SectionID: number): IFilterField[] {
  return [
    {
      label: "",
      inputType: NUMBER,
      hidden: true,
      defaultValue: SectionID,
      fieldName: "SectionID",
      ariaLabel: "SectionID"
    },
    {
      inputType: "PERSON_SELECTOR",
      fieldName: "",
      customFilterComponent: PersonSelector
    },
    {
      inputType: "DATE_TYPE_SELECTOR",
      fieldName: "",
      customFilterComponent: DateTypelector
    },
    // {
    //   inputType: "TOTAL_AMOUNT_RANGE",
    //   fieldName: "",
    //   customFilterComponent: TotalAmountRange
    // },
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
      label: "Department",
      inputType: DROPDOWN,
      defaultValue: "",
      fieldName: "OrganizationID",
      ariaLabel: "Department Select",
      refLookupService: getOrganizations,
      displayKey: "Name",
      valueKey: "OrganizationID"
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
      customFilterComponent: AccountLookup
    }
  ]
}
