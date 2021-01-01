import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { IDetailsCustomTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsCustomTab"
import QuestionTaggingPage from "~/Pages/Manage/Question/QuestionTaggingPage"

export const getQuestionRepositoryDetailsMeta = (question: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      { label: "Question", value: question.Name },
      { label: "Display As", value: question.Description },
      { label: "Active", value: question.IsActive },
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

  const scheduleMeta: IDetailsCustomTabProp = {
    component: QuestionTaggingPage,
    props: {}
  }

  meta.push({
    tabTitle: "Event Questions",
    tabType: "custom",
    tabMeta: scheduleMeta
  })

  return {
    pageTitle: `Question ID - ${question.PreferenceDefID}`,
    tabs: meta
  }
}
