import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { GradeScoreDefinitionSearchMeta } from "~/TableSearchMeta/GradeScoreDefinition/GradeScoreDefinitionSearchMeta"
import { getGradeScoreDefinitionTableColumns } from "~/TableSearchMeta/GradeScoreDefinition/GradeScoreDefinitionTableColumns"

export default function CertificatesPage() {
  return (
    <SearchPage
      title="Grade Score Definitions"
      meta={GradeScoreDefinitionSearchMeta}
      metaName="GradeScoreDefinitionSearchMeta"
      hideSearchField={false}
      tableProps={{
        ...getGradeScoreDefinitionTableColumns()
      }}
    ></SearchPage>
  )
}
