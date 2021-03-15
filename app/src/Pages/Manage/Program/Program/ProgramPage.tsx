import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { ProgramSearchMeta } from "~/TableSearchMeta/Program/ProgramSearchMeta"
import { getProgramTableColumns } from "~/TableSearchMeta/Program/ProgramTableColumns"

export default function ProgramProgramPage() {
  return (
    <SearchPage
      title="Manage Programs"
      meta={ProgramSearchMeta}
      metaName="ProgramSearchMeta"
      tableProps={{
        ...getProgramTableColumns()
      }}
    ></SearchPage>
  )
}
