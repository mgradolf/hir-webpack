import { getQuestionEvents } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterField } from "~/Component/Common/SearchFilters/common"

export const QuestionTaggingSearchMeta: IFilterField[] = [
  {
    label: "Event",
    inputType: DROPDOWN,
    fieldName: "EventID",
    refLookupService: getQuestionEvents,
    displayKey: "Name",
    valueKey: "ID"
  }
]
