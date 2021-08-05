import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { ProgramFormOpenButton } from "~/Component/Feature/Program/Forms/ProgramForm"
import { ProgramSearchMeta } from "~/TableSearchMeta/Program/ProgramSearchMeta"
import { getProgramTableColumns } from "~/TableSearchMeta/Program/ProgramTableColumns"

export default function ProgramProgramPage() {
  return (
    <SearchPage
      title="Manage Programs"
      blocks={[
        <ProgramFormOpenButton helpKey="programSearchProgramsAddNewProgram" iconType="create" editMode={false} />
      ]}
      meta={ProgramSearchMeta}
      helpKey="programSearchPrograms"
      metaName="ProgramSearchMeta"
      tableProps={{
        ...getProgramTableColumns()
      }}
    ></SearchPage>
  )
}
