import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { ActivityOrderSearchMeta } from "~/FormMeta/ActivityOrder/ActivityOrderSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getActivityOrderSearchTableColumns } from "~/FormMeta/ActivityOrder/ActivityOrderSearchTableColumns"

export default function OrderLogPage(props: RouteComponentProps<{ sectionID: string }>) {
  const SectionID = Number(props.match.params.sectionID)
  return (
    <SearchPage
      title="Section Order Activity"
      initialFilter={{}}
      meta={ActivityOrderSearchMeta}
      hideSearchField={false}
      defaultFilter={{ SectionID }}
      tableProps={{
        ...getActivityOrderSearchTableColumns()
      }}
    ></SearchPage>
  )
}
