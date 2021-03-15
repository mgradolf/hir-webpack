import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { QuestionResponseSearchMeta } from "~/TableSearchMeta/QuestionResponse/QuestionResponseSearchMeta"
import { getQuestionResponseTableColumns } from "~/TableSearchMeta/QuestionResponse/QuestionResponseTableColumn"

export default function QuestionResponsePage() {
  return (
    <SearchPage
      title="Manage Question Response"
      meta={QuestionResponseSearchMeta}
      metaName="QuestionResponseSearchMeta"
      initialFormValue={{ EventID: 2 }}
      hideSearchField={false}
      tableProps={{
        ...getQuestionResponseTableColumns()
      }}
    ></SearchPage>
  )
}
