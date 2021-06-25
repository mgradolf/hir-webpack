import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getCertificateDefinitionDetailsMeta } from "~/TableSearchMeta/CertificateDefinition/CertificateDefinitionDetailsMeta"
import { getCertificateDefinitionTableColumns } from "~/TableSearchMeta/CertificateDefinition/CertificateDefinitionTableColumns"

export default function CertificatesDetailsPage(props: RouteComponentProps<{ CertificateID?: string }>) {
  const CertificateID = Number(props?.match?.params?.CertificateID)
  return (
    <DetailsPage
      getMeta={getCertificateDefinitionDetailsMeta}
      getDetails={() =>
        getCertificateDefinitionTableColumns()
          .searchFunc({ certificateID: CertificateID })
          .then((x) => {
            if (x.success) x.data = x.data[0]
            return x
          })
      }
    />
  )
}
