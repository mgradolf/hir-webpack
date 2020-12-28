import React from "react"
import { AcademicActivitySearchMeta } from "~/FormMeta/Academic/AcademicActivitySearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getAcademicActivityLogTableColumns } from "~/FormMeta/Academic/AcademicActivityTableColumns"

export default function AcademicLogPage() {
  return (
    <SearchPage
      title="Academic Log"
      initialFilter={{}}
      meta={AcademicActivitySearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getAcademicActivityLogTableColumns(false)
      }}
    ></SearchPage>
  )
}
