import React from "react"
import { ActivityOrderSearchMeta } from "~/FormMeta/ActivityOrder/ActivityOrderSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getActivityOrderSearchTableColumns } from "~/FormMeta/ActivityOrder/ActivityOrderSearchTableColumns"

export default function AcademicLogPage() {
  return (
    <SearchPage
      title="Order Activity"
      initialFilter={{}}
      meta={ActivityOrderSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getActivityOrderSearchTableColumns()
      }}
    ></SearchPage>
  )
}
