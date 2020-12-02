import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { ProgramApplicationSeaarchMeta } from "~/FormMeta/Program/ProgramSearchMeta"
import { getProgramApplicationTableColumns } from "~/FormMeta/Program/ProgramTableColumns"

export default function ProgramApplication() {
  return (
    <SearchPage
      title="Manage Program Applications"
      meta={ProgramApplicationSeaarchMeta}
      hideSearchField={false}
      defaultFilter={{}}
      tableProps={getProgramApplicationTableColumns()}
    ></SearchPage>
  )
}
