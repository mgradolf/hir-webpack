import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getSectionTypeTypeTableColumns } from "~/FormMeta/SectionType/SectionTypeTypeTableColumns"
import { SectionTypeSearchMeta } from "~/FormMeta/SectionType/SectionTypeSearchMeta"

export default function SectionTypePage() {
  return (
    <SearchPage
      title="Section Types"
      meta={SectionTypeSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getSectionTypeTypeTableColumns()
      }}
    ></SearchPage>
  )
}
