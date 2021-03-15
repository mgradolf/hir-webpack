import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { ForgetMeRequestSearchMeta } from "~/TableSearchMeta/ForgetMeRequest/ForgetMeRequestSearchMeta"
import { getForgetMeRequestTableColumns } from "~/TableSearchMeta/ForgetMeRequest/ForgetMeRequestTableColumns"

export default function () {
  return (
    <SearchPage
      title="Manage Forget Me Requests"
      meta={ForgetMeRequestSearchMeta}
      metaName="ForgetMeRequestSearchMeta"
      hideSearchField={false}
      tableProps={{
        ...getForgetMeRequestTableColumns()
      }}
    ></SearchPage>
  )
}
