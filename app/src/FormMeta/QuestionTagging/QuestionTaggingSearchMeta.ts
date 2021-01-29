import { getQuestionEvents } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IField } from "~/Component/Common/Form/common"

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
