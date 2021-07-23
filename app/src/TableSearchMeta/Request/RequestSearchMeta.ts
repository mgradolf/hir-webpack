import { getRequestType, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { getEnumValues } from "~/ApiServices/Service/RequestService"
import { DROPDOWN, IField, DATE_PICKERS, TEXT, CUSTOM_FIELD } from "~/Component/Common/Form/common"
import { AccountLookup } from "~/Component/Common/Form/FormLookupFields/AccountLookup"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"
// import { FormFieldSelector } from "~/Component/Common/Form/FormFieldSelectors/FormFieldSelector"
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
    label: "Account",
    fieldName: "AccountID",
    valueKey: "AccountID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: AccountLookup
  },
  {
    label: "Purchaser",
    fieldName: "PurchaserPersonID",
    valueKey: "PersonID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: PersonLookup
  },
  {
    label: "Recipient",
    fieldName: "RecipientPersonID",
    valueKey: "PersonID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: PersonLookup
  },
  {
    label: "Any",
    fieldName: "PersonID",
    valueKey: "PersonID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: PersonLookup
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
    displayKey: "ProductName",
    valueKey: "ProductID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: ProductLookup
  },
  {
    label: "Program",
    fieldName: "ProgramID",
    displayKey: "Name",
    valueKey: "ProgramID",
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
