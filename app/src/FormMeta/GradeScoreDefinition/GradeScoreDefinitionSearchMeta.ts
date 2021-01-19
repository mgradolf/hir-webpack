import { DROPDOWN, IFilterField } from "~/Component/Common/SearchFilters/common"
import { getGradeScaleType } from "~/ApiServices/Service/RefLookupService"

export const GradeScoreDefinitionSearchMeta: IFilterField[] = [
  {
    label: "Grade Scale Type",
    inputType: DROPDOWN,
    fieldName: "GradeScaleTypeID",
    refLookupService: getGradeScaleType,
    displayKey: "Name",
    valueKey: "ID"
  }
]
