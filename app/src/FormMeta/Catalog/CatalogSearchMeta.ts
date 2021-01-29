import { getCatalogTypes } from "~/ApiServices/Service/RefLookupService"
import { CUSTOM_FIELD, DATE_PICKERS, DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"
import { AccountLookup } from "~/Component/Common/Form/FormLookupFields/AccountLookup"
import { OfferingLookupButton } from "~/Component/Common/Form/FormLookupFields/OfferingLookup"
import { ProgramLookup } from "~/Component/Common/Form/FormLookupFields/ProgramLookup"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"

export const CatalogSearchMeta: IField[] = [
  {
    label: "Name",
    fieldName: "Name",
    inputType: TEXT
  },
  {
    label: "Catalog Type",
    fieldName: "CatalogTypeID",
    inputType: DROPDOWN,
    refLookupService: getCatalogTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Start Date",
    fieldName: "StartDateFrom",
    fieldName2: "StartDateTo",
    inputType: DATE_PICKERS
  },
  {
    label: "Is Active",
    fieldName: "IsActive",
    inputType: DROPDOWN,
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ]
  },
  {
    label: "Offering",
    fieldName: "OfferingID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: OfferingLookupButton
  },
  {
    label: "Section",
    fieldName: "SectionID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SectionLookup
  },
  {
    label: "Program",
    fieldName: "ProgramID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: ProgramLookup,
    valueKey: "ProgramID"
  },
  {
    label: "Account",
    fieldName: "AccountID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: AccountLookup
  }
]
