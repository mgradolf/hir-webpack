import { getQuestionEvents } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IField } from "~/Component/Common/SearchForm/common"

export const QuestionTaggingSearchMeta: IField[] = [
  {
    label: "Event",
    inputType: DROPDOWN,
    fieldName: "EventID",
    refLookupService: getQuestionEvents,
    displayKey: "Name",
    valueKey: "ID"
  }
]
