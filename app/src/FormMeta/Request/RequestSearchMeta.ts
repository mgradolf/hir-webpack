import { getRequestType, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { getEnumValues } from "~/ApiServices/Service/RequestService"
import { DROPDOWN, IField, DATE_PICKERS, TEXT, CUSTOM_FIELD } from "~/Component/Common/SearchForm/common"
import { SearchAccountLookup } from "~/Component/Common/SearchForm/SearchLookups/SearchAccountLookup"
import { SearchPersonLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchPersonLookup"
import { SearchSectionLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchSectionLookup"
import { SearchLookupSelector } from "~/Component/Common/SearchForm/SearchSelectors/SearchComponentSelector"

export const RequestSearchMeta: IField[] = [
  {
    label: "Request Status",
    inputType: DROPDOWN,
    fieldName: "StateID",
    refLookupService: getEnumValues,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Account & Person Selector",
    fieldName: "",
    inputType: CUSTOM_FIELD,
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
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchSectionLookupButton
  },
  {
    label: "Request Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "CreatedFromDate",
    valueKey: "CreatedFromDate",
    displayKey2: "To",
    valueKey2: "CreatedToDate",
    fieldName2: "CreatedToDate"
  },
  {
    label: "Request Type",
    inputType: DROPDOWN,
    fieldName: "RequestTypeID",
    refLookupService: getRequestType,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Reservation Token",
    inputType: TEXT,
    fieldName: "ReservationToken"
  },
  {
    label: "Source",
    inputType: DROPDOWN,
    fieldName: "sourceID",
    refLookupService: getSourceModule,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Staff",
    inputType: TEXT,
    fieldName: "RequesterStaffUserName"
  }
]
