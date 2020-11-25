import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { RequestSearchMeta } from "~/FormMeta/Request/RequestSearchMeta"
import { getRequestTableColumns } from "~/FormMeta/Request/RequestTableColumns"

export default function Request(props: RouteComponentProps<{ sectionID?: string }>) {
  const SectionID = Number(props?.match?.params?.sectionID)
  return (
    <SearchPage
      title="Requests"
      meta={RequestSearchMeta}
      hideSearchField={true}
      defaultFilter={{ SectionID }}
      tableProps={getRequestTableColumns()}
    ></SearchPage>
  )
}
