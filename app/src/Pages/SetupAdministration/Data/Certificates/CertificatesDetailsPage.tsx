import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getCertificateDefinitionDetailsMeta } from "~/FormMeta/CertificateDefinition/CertificateDefinitionDetailsMeta"
import { getCertificateDefinitionTableColumns } from "~/FormMeta/CertificateDefinition/CertificateDefinitionTableColumns"

export default function CertificatesDetailsPage(props: RouteComponentProps<{ CertificateID?: string }>) {
  const CertificateID = Number(props?.match?.params?.CertificateID)
  return (
    <DetailsPage
      getMeta={getCertificateDefinitionDetailsMeta}
      getDetails={() =>
        getCertificateDefinitionTableColumns()
          .searchFunc({ CertificateID })
          .then((x) => {
            if (x.success) x.data = x.data[0]
            return x
          })
      }
      // entityType="Organization"
      // entityID={CertificateID}
    />
  )
}
