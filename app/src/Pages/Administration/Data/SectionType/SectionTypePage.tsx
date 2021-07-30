import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { SectionTypeSearchMeta } from "~/TableSearchMeta/SectionType/SectionTypeSearchMeta"
import { getSectionTypeTableColumns } from "~/TableSearchMeta/SectionType/SectionTypeTypeTableColumns"

export default function SectionTypePage() {
  return (
    <SearchPage
      title="Section Types"
      meta={SectionTypeSearchMeta}
      metaName="SectionTypeSearchMeta"
      hideSearchField={false}
      helpKey="administrationDataSearchSectionTypes"
      tableProps={{
        ...getSectionTypeTableColumns()
      }}
    ></SearchPage>
  )
}
