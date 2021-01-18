import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { GradeScoreDefinitionSearchMeta } from "~/FormMeta/GradeScoreDefinition/GradeScoreDefinitionSearchMeta"
import { getGradeScoreDefinitionTableColumns } from "~/FormMeta/GradeScoreDefinition/GradeScoreDefinitionTableColumns"

export default function CertificatesPage() {
  return (
    <SearchPage
      title="Grade Score Definitions"
      meta={GradeScoreDefinitionSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getGradeScoreDefinitionTableColumns()
      }}
    ></SearchPage>
  )
}
