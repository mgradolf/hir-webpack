import { getCatalogTypes } from "~/ApiServices/Service/RefLookupService"
import { CUSTOM_FIELD, DATE_PICKERS, DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"
import { SearchAccountLookup } from "~/Component/Common/Form/SearchLookups/SearchAccountLookup"
import { SearchOfferingLookupButton } from "~/Component/Common/Form/SearchLookups/SearchOfferingLookup"
import { SearchProgramLookupButton } from "~/Component/Common/Form/SearchLookups/SearchProgramLookup"
import { SearchSectionLookupButton } from "~/Component/Common/Form/SearchLookups/SearchSectionLookup"

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
    customFilterComponent: SearchOfferingLookupButton
  },
  {
    label: "Section",
    fieldName: "SectionID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchSectionLookupButton
  },
  {
    label: "Program",
    fieldName: "ProgramID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchProgramLookupButton,
    valueKey: "ProgramID"
  },
  {
    label: "Account",
    fieldName: "AccountID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchAccountLookup
  }
]
