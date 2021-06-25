import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { CertificateDefinitionFormModal } from "~/Component/Feature/CertificateDefinition/CertificateDefinitionFormModal"
import { CertificateDefinitionSearchMeta } from "~/TableSearchMeta/CertificateDefinition/CertificateDefinitionSearchMeta"
import { getCertificateDefinitionTableColumns } from "~/TableSearchMeta/CertificateDefinition/CertificateDefinitionTableColumns"
import { CERTIFICATE_CATEGORY_DEFAULT } from "~/utils/Constants"

export default function CertificatesPage() {
  return (
    <SearchPage
      blocks={[
        <CertificateDefinitionFormModal
          initialValues={{
            IsActive: true,
            PublishOnWeb: true,
            IsProgramCertificate: true,
            CertificateCategoryTypeID: CERTIFICATE_CATEGORY_DEFAULT
          }}
          editMode={false}
        />
      ]}
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
