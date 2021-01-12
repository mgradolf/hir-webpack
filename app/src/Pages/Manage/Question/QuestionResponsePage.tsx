import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { QuestionResponseSearchMeta } from "~/FormMeta/QuestionResponse/QuestionResponseSearchMeta"
import { getQuestionResponseTableColumns } from "~/FormMeta/QuestionResponse/QuestionResponseTableColumn"

export default function QuestionResponsePage() {
  return (
    <SearchPage
      title="Question Response"
      meta={QuestionResponseSearchMeta}
      initialFilter={{ EventID: 2 }}
      hideSearchField={false}
      tableProps={{
        ...getQuestionResponseTableColumns()
      }}
    ></SearchPage>
  )
}
