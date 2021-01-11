import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { searchQuestions } from "~/ApiServices/Service/QuestionService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getQuestionRepositoryDetailsMeta } from "~/FormMeta/QuestionRepository/QuestionRepositoryDetailsMeta"

export default function QuestionRepositoryDetailsPage(props: RouteComponentProps<{ PreferenceDefID: string }>) {
  const PreferenceDefID = Number(props?.match?.params?.PreferenceDefID)
  return (
    <DetailsPage
      getMeta={getQuestionRepositoryDetailsMeta}
      getDetails={() =>
        searchQuestions({ PreferenceDefID }).then((x) => {
          if (x.success) x.data = x.data[0]
          return x
        })
      }
    />
  )
}
