import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { CertificateFormModal } from "~/Component/Feature/Certificate/CertificateFormModal"
import { CourseCertificateSearchMeta } from "~/TableSearchMeta/Certificate/CertificateSearchMeta"
import { getCertificateTableColumns } from "~/TableSearchMeta/Certificate/CertificateTableColumns"

export default function Certificate() {
  return (
    <SearchPage
      blocks={[<CertificateFormModal initialValues={{}} isProgram={false} />]}
      title="Manage Certificates"
      meta={CourseCertificateSearchMeta}
      metaName="CourseCertificateSearchMeta"
      hideSearchField={false}
      tableProps={{
        ...getCertificateTableColumns(true)
      }}
    ></SearchPage>
  )
}
