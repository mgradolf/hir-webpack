import {
  getQuestionEvents,
  getSectionRosterStatusCode,
  getSectionStatusCode,
  getTagTypes
} from "~/ApiServices/Service/RefLookupService"
import { getTags } from "~/ApiServices/Service/TagService"
import { CUSTOM_FIELD, DROPDOWN, IField } from "~/Component/Common/SearchForm/common"
import { SearchQuestionLookup } from "~/Component/Common/SearchForm/SearchLookups/SearchQuestionsLookup"
import { SearchSectionLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchSectionLookup"
import { SearchStudentLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchStudentLookup"

export const QuestionResponseSearchMeta: IField[] = [
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
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchSectionLookupButton,
    extraProps: {
      isArray: true
    }
  },
  {
    label: "Students",
    fieldName: "StudentsIDs",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchStudentLookupButton,
    extraProps: {
      isArray: true
    }
  },
  {
    label: "Questions",
    fieldName: "PreferenceDefIDs",
    inputType: CUSTOM_FIELD,
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
    inputType: DROPDOWN,
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ],
    fieldName: "IsAnswered"
  },
  {
    label: "Is Published",
    inputType: DROPDOWN,
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ],
    fieldName: "IsPublished"
  }
]
