import React, { useState } from "react"
import { QuestionTaggingSearchMeta } from "~/TableSearchMeta/QuestionTagging/QuestionTaggingSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getQuestionTaggingTableColumns } from "~/TableSearchMeta/QuestionTagging/QuestionTaggingTableColumn"
import { QuestionCreateButton } from "~/Component/Feature/Question/Create/QuestionCreateButton"
import { QuestionFindButton } from "~/Component/Feature/Question/Search/QuestionFindButton"

export function QuestionTaggingPage(props: { TagID: number }) {
  const [params, setParams] = useState<any>({})
  return (
    <SearchPage
      title="Manage Accounts"
      meta={QuestionTaggingSearchMeta}
      metaName="QuestionTaggingSearchMeta"
      hideSearchField={false}
      initialFormValue={{ TagID: props.TagID, EventID: 2 }}
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
