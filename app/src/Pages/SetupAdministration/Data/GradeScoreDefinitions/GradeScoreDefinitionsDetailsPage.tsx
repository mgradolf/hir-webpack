import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getGradeScoreDefinitionDetailsMeta } from "~/FormMeta/GradeScoreDefinition/GradeScoreDefinitionDetailsMeta"
import { getGradeScoreDefinitionTableColumns } from "~/FormMeta/GradeScoreDefinition/GradeScoreDefinitionTableColumns"

export default function CertificatesDetailsPage(props: RouteComponentProps<{ GradeScoreDefinitionID?: string }>) {
  const GradeScoreDefinitionID = Number(props?.match?.params?.GradeScoreDefinitionID)
  return (
    <DetailsPage
      getMeta={getGradeScoreDefinitionDetailsMeta}
      getDetails={() =>
        getGradeScoreDefinitionTableColumns()
          .searchFunc({ GradeScoreDefinitionID })
          .then((x) => {
            if (x.success) x.data = x.data[0]
            return x
          })
      }
      // entityType="Organization"
      // entityID={GradeScoreDefinitionID}
    />
  )
}
