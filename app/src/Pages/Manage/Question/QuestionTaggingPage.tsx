import React, { useState } from "react"
import { QuestionTaggingSearchMeta } from "~/FormMeta/QuestionTagging/QuestionTaggingSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getQuestionTaggingTableColumns } from "~/FormMeta/QuestionTagging/QuestionTaggingTableColumn"
import { QuestionCreateButton } from "~/Component/Question/Create/QuestionCreateButton"
import { QuestionFindButton } from "~/Component/Question/Search/QuestionFindButton"

export function QuestionTaggingPage(props: { TagID: number }) {
  const [params, setParams] = useState<any>({})
  return (
    <SearchPage
      title="Accounts"
      meta={QuestionTaggingSearchMeta}
      hideSearchField={false}
      initialFilter={{ TagID: props.TagID, EventID: 2 }}
      blocks={[
        <QuestionCreateButton TagID={props.TagID} EventID={params.EventID || 2} />,
        <QuestionFindButton TagID={props.TagID} EventID={params.EventID || 2} />
      ]}
      updatedParams={(params) => setParams(params)}
      tableProps={{
        refreshEventName: "REFRESH_TAG__QUESTIONS",
        ...getQuestionTaggingTableColumns()
      }}
    ></SearchPage>
  )
}
