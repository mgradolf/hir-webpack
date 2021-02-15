import React from "react"
import { ActivityOrderSearchMeta } from "~/TableSearchMeta/ActivityOrder/ActivityOrderSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getActivityOrderSearchTableColumns } from "~/TableSearchMeta/ActivityOrder/ActivityOrderSearchTableColumns"

export default function AcademicLogPage() {
  return (
    <SearchPage
      title="Order Activity"
      initialFormValue={{}}
      meta={ActivityOrderSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getActivityOrderSearchTableColumns()
      }}
    ></SearchPage>
  )
}
