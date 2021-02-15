import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { ActivityOrderSearchMeta } from "~/TableSearchMeta/ActivityOrder/ActivityOrderSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getActivityOrderSearchTableColumns } from "~/TableSearchMeta/ActivityOrder/ActivityOrderSearchTableColumns"

export default function OrderLogPage(props: RouteComponentProps<{ sectionID: string }>) {
  const SectionID = Number(props.match.params.sectionID)
  return (
    <SearchPage
      title="Manage Section Order Activity"
      initialFormValue={{}}
      meta={ActivityOrderSearchMeta}
      hideSearchField={false}
      defaultFormValue={{ SectionIDs: [SectionID] }}
      tableProps={{
        ...getActivityOrderSearchTableColumns()
      }}
    ></SearchPage>
  )
}
