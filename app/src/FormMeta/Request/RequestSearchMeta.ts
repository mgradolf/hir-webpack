import { getRequestType, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { getEnumValues } from "~/ApiServices/Service/RequestService"
import { DROPDOWN, IField, DATE_PICKERS, TEXT, CUSTOM_FIELD } from "~/Component/Common/Form/common"
import { AccountLookup } from "~/Component/Common/Form/FormLookupFields/AccountLookup"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"
import { FormFieldSelector } from "~/Component/Common/Form/FormFieldSelectors/FormFieldSelector"
import { ProductLookup } from "~/Component/Common/Form/FormLookupFields/ProductLookup"
import { ProgramLookup } from "~/Component/Common/Form/FormLookupFields/ProgramLookup"

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
    customFilterComponent: FormFieldSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "Account",
          fieldName: "AccountID",
          valueField: "AccountID",
          component: AccountLookup
        },
        {
          label: "Purchaser",
          fieldName: "PurchaserPersonID",
          valueField: "PersonID",
          component: PersonLookup
        },
        {
          label: "Recipient",
          fieldName: "RecipientPersonID",
          valueField: "PersonID",
          component: PersonLookup
        },
        {
          label: "Any",
          fieldName: "PersonID",
          valueField: "PersonID",
          component: PersonLookup
        }
      ]
    }
  },
  {
    label: "Section",
    fieldName: "SectionID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SectionLookup
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
    label: "Product",
    fieldName: "ProductID",
    valueField: "ProductID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: ProductLookup
  },
  {
    label: "Program",
    fieldName: "ProgramID",
    valueField: "ProgramID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: ProgramLookup
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
