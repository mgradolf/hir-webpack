import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { SectionTypeSearchMeta } from "~/FormMeta/SectionType/SectionTypeSearchMeta"
import { getSectionTypeTableColumns } from "~/FormMeta/SectionType/SectionTypeTypeTableColumns"

export default function SectionTypePage() {
  return (
    <SearchPage
      title="Section Types"
      meta={SectionTypeSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getSectionTypeTableColumns()
      }}
    ></SearchPage>
  )
}
