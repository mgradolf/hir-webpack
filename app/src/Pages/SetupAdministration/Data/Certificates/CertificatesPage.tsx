import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { CertificateDefinitionSearchMeta } from "~/FormMeta/CertificateDefinition/CertificateDefinitionSearchMeta"
import { getCertificateDefinitionTableColumns } from "~/FormMeta/CertificateDefinition/CertificateDefinitionTableColumns"

export default function CertificatesPage() {
  return (
    <SearchPage
      title="Certificates"
      meta={CertificateDefinitionSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getCertificateDefinitionTableColumns()
      }}
    ></SearchPage>
  )
}
