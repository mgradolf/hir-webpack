import React from "react"
import { AcademicActivitySearchMeta } from "~/TableSearchMeta/Academic/AcademicActivitySearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getAcademicActivityLogTableColumns } from "~/TableSearchMeta/Academic/AcademicActivityTableColumns"

export default function AcademicLogPage() {
  return (
    <SearchPage
      title="Academic Log"
      meta={AcademicActivitySearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getAcademicActivityLogTableColumns(false)
      }}
    ></SearchPage>
  )
}
