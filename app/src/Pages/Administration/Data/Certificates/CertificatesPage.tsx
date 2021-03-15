import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { CertificateDefinitionSearchMeta } from "~/TableSearchMeta/CertificateDefinition/CertificateDefinitionSearchMeta"
import { getCertificateDefinitionTableColumns } from "~/TableSearchMeta/CertificateDefinition/CertificateDefinitionTableColumns"

export default function CertificatesPage() {
  return (
    <SearchPage
      title="Certificates"
      meta={CertificateDefinitionSearchMeta}
      metaName="CertificateDefinitionSearchMeta"
      hideSearchField={false}
      tableProps={{
        ...getCertificateDefinitionTableColumns()
      }}
    ></SearchPage>
  )
}
