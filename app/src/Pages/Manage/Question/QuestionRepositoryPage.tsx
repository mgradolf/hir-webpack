import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { QuestionRepositorySearchMeta } from "~/TableSearchMeta/QuestionRepository/QuestionRepositorySearchMeta"
import { getQuestionRepositoryTableColumn } from "~/TableSearchMeta/QuestionRepository/QuestionRepositoryTableColumn"

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
