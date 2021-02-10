import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderBoolean } from "~/Component/Common/ResponsiveTable"
import { QuestionTaggingSearchMeta } from "~/FormMeta/QuestionTagging/QuestionTaggingSearchMeta"
import { getQuestionTaggingTableColumns } from "~/FormMeta/QuestionTagging/QuestionTaggingTableColumn"

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

  meta.push({
    tabTitle: "Tagging",
    tabType: "searchtable",
    tabMeta: {
      searchMeta: QuestionTaggingSearchMeta,
      defaultFormValue: { PreferenceDefID: question.PreferenceDefID },
      initialFormValue: { EventID: 2 },
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
