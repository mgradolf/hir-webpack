import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { RequestSearchMeta } from "~/TableSearchMeta/Request/RequestSearchMeta"
import { getRequestTableColumns } from "~/TableSearchMeta/Request/RequestTableColumns"

export default function Request(props: RouteComponentProps<{ sectionID?: string }>) {
  const SectionID = Number(props?.match?.params?.sectionID)
  return (
    <SearchPage
      title="Manage Requests"
      meta={RequestSearchMeta}
      hideSearchField={true}
      defaultFormValue={{ SectionID }}
      tableProps={getRequestTableColumns()}
    ></SearchPage>
  )
}
