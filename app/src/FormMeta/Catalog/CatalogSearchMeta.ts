import { getCatalogTypes } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, IFilterField, NUMBER, TEXT } from "~/Component/Common/SearchFilters/common"
import { SearchOfferingLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchOfferingLookup"
import { SearchProgramLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchProgramLookup"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"

export const CatalogSearchMeta: IFilterField[] = [
  {
    label: "Section",
    fieldName: "SectionID",
    customFilterComponent: SearchSectionLookupButton
  }, //: 10825,
  {
    label: "Offering",
    fieldName: "OfferingID",
    customFilterComponent: SearchOfferingLookupButton
  }, //: 6824,
  {
    label: "Program",
    fieldName: "ProgramID",
    customFilterComponent: SearchProgramLookupButton,
    valueKey: "ProgramID"
  }, // : 12345,
  {
    label: "CatalogID",
    fieldName: "CatalogID",
    inputType: NUMBER
  }, //: 5064
  {
    label: "Name",
    fieldName: "Name",
    inputType: TEXT
  }, // : "*",
  {
    label: "StartDateFrom",
    fieldName: "StartDateFrom",
    fieldName2: "StartDateTo",
    inputType: DATE_PICKERS
  }, //: "2008-03-01T00:00:00+06:00",
  {
    label: "CatalogTypeID",
    fieldName: "CatalogTypeID",
    inputType: DROPDOWN,
    refLookupService: getCatalogTypes,
    displayKey: "Name",
    valueKey: "ID"
  } //: 1002,
]
