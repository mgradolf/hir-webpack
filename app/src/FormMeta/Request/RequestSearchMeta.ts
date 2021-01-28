import { getRequestType, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { getEnumValues } from "~/ApiServices/Service/RequestService"
import { DROPDOWN, IFilterField, DATE_PICKERS, TEXT } from "~/Component/Common/SearchFilters/common"
import { SearchAccountLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchAccountLookup"
import { SearchPersonLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchPersonLookup"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"
import { SearchLookupSelector } from "~/Component/Common/SearchFilters/SearchSelectors/SearchComponentSelector"

export const RequestSearchMeta: IFilterField[] = [
  {
    label: "Request Status",
    inputType: DROPDOWN,
    fieldName: "StateID",
    ariaLabel: "Request Status",
    refLookupService: getEnumValues,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Account & Person Selector",
    fieldName: "",
    customFilterComponent: SearchLookupSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "Account",
          fieldName: "AccountID",
          valueField: "AccountID",
          component: SearchAccountLookup
        },
        {
          label: "Purchaser",
          fieldName: "PurchaserPersonID",
          valueField: "PersonID",
          component: SearchPersonLookupButton
        },
        {
          label: "Recipient",
          fieldName: "RecipientPersonID",
          valueField: "PersonID",
          component: SearchPersonLookupButton
        },
        {
          label: "Any",
          fieldName: "PersonID",
          valueField: "PersonID",
          component: SearchPersonLookupButton
        }
      ]
    }
  },
  {
    label: "Section",
    fieldName: "SectionID",
    customFilterComponent: SearchSectionLookupButton
  },
  {
    label: "Request Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "CreatedFromDate",
    valueKey: "CreatedFromDate",
    ariaLabel: "Request Date From",
    displayKey2: "To",
    valueKey2: "CreatedToDate",
    fieldName2: "CreatedToDate",
    ariaLabel2: "Request Date To"
  },
  {
    label: "Request Type",
    inputType: DROPDOWN,
    fieldName: "RequestTypeID",
    ariaLabel: "Request Type",
    refLookupService: getRequestType,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Reservation Token",
    inputType: TEXT,
    fieldName: "ReservationToken",
    ariaLabel: "ReservationToken"
  },
  {
    label: "Source",
    inputType: DROPDOWN,
    fieldName: "sourceID",
    ariaLabel: "Source",
    refLookupService: getSourceModule,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Staff",
    inputType: TEXT,
    fieldName: "RequesterStaffUserName",
    ariaLabel: "Staff"
  }
]
