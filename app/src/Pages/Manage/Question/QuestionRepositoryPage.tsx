import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { QuestionRepositorySearchMeta } from "~/FormMeta/QuestionRepository/QuestionRepositorySearchMeta"
import { getQuestionRepositoryTableColumn } from "~/FormMeta/QuestionRepository/QuestionRepositoryTableColumn"

export default function QuestionRepository() {
  return (
    <SearchPage
      title="Manage Questions"
      meta={QuestionRepositorySearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getQuestionRepositoryTableColumn()
      }}
    ></SearchPage>
  )
}
