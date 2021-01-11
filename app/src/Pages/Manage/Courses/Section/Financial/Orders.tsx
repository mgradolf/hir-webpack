import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { OrderSearchMeta } from "~/FormMeta/Order/OrderSearchMeta"
import { getOrderTableColumns } from "~/FormMeta/Order/OrderTableColumns"

export default function OrderLogPage(props: RouteComponentProps<{ sectionID: string }>) {
  const SectionID = Number(props.match.params.sectionID) || undefined

  // eslint-disable-next-line
  const [meta, ...modifiedMeta] = OrderSearchMeta
  return (
    <div className="site-layout-content">
      <SearchPage
        title="Find Order Activity"
        meta={modifiedMeta}
        hideSearchField={true}
        defaultFilter={{ SectionIDs: [SectionID] }}
        tableProps={getOrderTableColumns()}
      />
    </div>
  )
}
