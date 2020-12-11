import { getCatalogTypes } from "~/ApiServices/Service/RefLookupService"
import { BOOLEAN, DATE_PICKERS, DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"
import { SearchAccountLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchAccountLookup"
import { SearchOfferingLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchOfferingLookup"
import { SearchProgramLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchProgramLookup"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"

export const CatalogSearchMeta: IFilterField[] = [
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
    inputType: BOOLEAN
  },
  {
    label: "Offering",
    fieldName: "OfferingID",
    customFilterComponent: SearchOfferingLookupButton
  },
  {
    label: "Section",
    fieldName: "SectionID",
    customFilterComponent: SearchSectionLookupButton
  },
  {
    label: "Program",
    fieldName: "ProgramID",
    customFilterComponent: SearchProgramLookupButton,
    valueKey: "ProgramID"
  },
  {
    label: "Account",
    fieldName: "AccountID",
    customFilterComponent: SearchAccountLookup
  }
]
