import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { ProgramSearchMeta } from "~/FormMeta/Program/ProgramSearchMeta"
import { getProgramTableColumns } from "~/FormMeta/Program/ProgramTableColumns"

export default function ProgramProgramPage() {
  return (
    <SearchPage
      title="Manage Program"
      meta={ProgramSearchMeta}
      tableProps={{
        ...getProgramTableColumns()
      }}
    ></SearchPage>
  )
}
