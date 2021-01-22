import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { ForgetMeRequestSearchMeta } from "~/FormMeta/ForgetMeRequest/ForgetMeRequestSearchMeta"
import { getForgetMeRequestTableColumns } from "~/FormMeta/ForgetMeRequest/ForgetMeRequestTableColumns"

export default function () {
  return (
    <SearchPage
      title="Manage Forget Me Requests"
      meta={ForgetMeRequestSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getForgetMeRequestTableColumns()
      }}
    ></SearchPage>
  )
}
