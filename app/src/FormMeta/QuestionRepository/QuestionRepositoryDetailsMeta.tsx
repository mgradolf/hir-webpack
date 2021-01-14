import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderBoolean } from "~/Component/Common/ResponsiveTable"
import { QuestionTaggingSearchMeta } from "~/FormMeta/QuestionTagging/QuestionTaggingSearchMeta"
import { getQuestionTaggingTableColumns } from "~/FormMeta/QuestionTagging/QuestionTaggingTableColumn"
// import { getTagsTabPageDetailsMeta } from "~/FormMeta/Tags/TagsTabPageDetailsMeta"

export const getQuestionRepositoryDetailsMeta = (question: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      { label: "Question", value: question.Name },
      { label: "Display As", value: question.Description },
      { label: "Active", value: question.IsActive, render: renderBoolean },
      { label: "OrganizationName", value: question.OrganizationName },
      { label: "Preference Value Type", value: question.PreferenceValueTypeName }
    ]
  }

  meta.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      summary: [summary]
    }
  })

  // meta.push({
  //   tabTitle: "Tags",
  //   tabType: "summary",
  //   tabMeta: [],
  //   multipleTabMetas: getTagsTabPageDetailsMeta({ EntityType: "Question", EntityID: question.PreferenceDefID }).tabs
  // })

  meta.push({
    tabTitle: "Tagged Questions",
    tabType: "searchtable",
    tabMeta: {
      searchMeta: QuestionTaggingSearchMeta,
      defaultFilter: { PreferenceDefID: question.PreferenceDefID },
      initialFilter: { EventID: 2 },
      tableProps: {
        pagination: false,
        ...getQuestionTaggingTableColumns(true),
        searchParams: { PreferenceDefID: question.PreferenceDefID },
        refreshEventName: "REFRESH_QUESTION_TAGGED_QUESTION"
      }
    }
  })

  return {
    pageTitle: `Question ID - ${question.PreferenceDefID}`,
    tabs: meta
  }
}