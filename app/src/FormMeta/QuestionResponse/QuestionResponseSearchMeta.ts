import {
  getQuestionEvents,
  getSectionRosterStatusCode,
  getSectionStatusCode,
  getTagTypes
} from "~/ApiServices/Service/RefLookupService"
import { getTags } from "~/ApiServices/Service/TagService"
import { BOOLEAN, DROPDOWN, IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchQuestionLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchQuestionsLookup"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"
import { SearchStudentLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchStudentLookup"

export const QuestionResponseSearchMeta: IFilterField[] = [
  {
    label: "Event",
    inputType: DROPDOWN,
    fieldName: "EventID",
    defaultValue: 2,
    refLookupService: getQuestionEvents,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Tag Type",
    inputType: DROPDOWN,
    fieldName: "TagTypeID",
    refLookupService: getTagTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Tag",
    inputType: DROPDOWN,
    fieldName: "TagID",
    refLookupService: () => getTags({}),
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Sections",
    fieldName: "SectionIDs",
    customFilterComponent: SearchSectionLookupButton,
    extraProps: {
      isArray: true
    }
  },
  {
    label: "Students",
    fieldName: "StudentsIDs",
    customFilterComponent: SearchStudentLookupButton,
    extraProps: {
      isArray: true
    }
  },
  {
    label: "Questions",
    fieldName: "PreferenceDefIDs",
    customFilterComponent: SearchQuestionLookup,
    extraProps: {
      isArray: true
    }
  },
  {
    label: "Section Status",
    inputType: DROPDOWN,
    fieldName: "SectionStatusCode",
    refLookupService: getSectionStatusCode,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Roster Status",
    inputType: DROPDOWN,
    fieldName: "SectionRosterStatusCodeID",
    refLookupService: getSectionRosterStatusCode,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Is Answered",
    inputType: BOOLEAN,
    fieldName: "IsAnswered"
  },
  {
    label: "Is Published",
    inputType: BOOLEAN,
    fieldName: "IsPublished"
  }
]
