import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { CertificateFormModal } from "~/Component/Feature/Certificate/CertificateFormModal"
import { ProgramCertificateSearchMeta } from "~/TableSearchMeta/Certificate/CertificateSearchMeta"
import { getCertificateTableColumns } from "~/TableSearchMeta/Certificate/CertificateTableColumns"

export default function () {
  return (
    <SearchPage
      blocks={[<CertificateFormModal initialValues={{}} isProgram={true} />]}
      title="Manage Certificates"
      helpKey="programSearchCertificate"
      meta={ProgramCertificateSearchMeta}
      metaName="ProgramCertificateSearchMeta"
      hideSearchField={false}
      tableProps={{
        ...getCertificateTableColumns(false)
      }}
      defaultFormValue={{ IsProgramCertificate: true }}
    ></SearchPage>
  )
}
