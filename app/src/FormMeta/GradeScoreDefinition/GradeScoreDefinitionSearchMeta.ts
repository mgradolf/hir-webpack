import { SearchPersonLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchPersonLookup"
import { DATE_PICKERS, DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"

export const GradeScoreDefinitionSearchMeta: IFilterField[] = [
  {
    label: "Grade Scale Type",
    inputType: DROPDOWN,

    fieldName: "GradeScaleTypeID",
    ariaLabel: "Grade Scale Type" 
    //TODO: use ref table GradeScaleType, always keep one item selected
    refLookupService: getSectionRosterStatusCode,
    displayKey: "Name",
    valueKey: "ID"
  }
]
