import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { ProgramApplicationMeta } from "~/FormMeta/Program/ProgramSearchFilterMeta"
import { getProgramApplicationTableColumns } from "~/FormMeta/Program/ProgramTableColumns"

export default function ProgramApplication() {
  return (
    <SearchPage
      title="Manage Program Applications"
      meta={ProgramApplicationMeta}
      hideSearchField={false}
      defaultFilter={{}}
      tableProps={getProgramApplicationTableColumns()}
    ></SearchPage>
  )
}
