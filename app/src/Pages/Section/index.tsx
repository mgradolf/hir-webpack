import * as React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { SectionSearchMeta } from "~/FormMeta/Section/SectionSearchMeta"
import { RouteComponentProps } from "react-router-dom"
import { getSectionTableColumns } from "~/FormMeta/Section/SectionTableColumns"

export default function Offering(props: RouteComponentProps<{ offeringID: string }>) {
  return (
    <SearchPage
      hideSearchField={false}
      title="Manage Sections"
      meta={SectionSearchMeta}
      tableProps={getSectionTableColumns()}
    ></SearchPage>
  )
}
