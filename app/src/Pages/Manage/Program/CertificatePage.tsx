import React, { useState } from "react"
import { Button } from "antd"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import CertificateFormModal from "~/Component/Certificate/CertificateFormModal"
import { ProgramCertificateSearchMeta } from "~/FormMeta/Certificate/CertificateSearchMeta"
import { getCertificateTableColumns } from "~/FormMeta/Certificate/CertificateTableColumns"

export function ProgramCertificatePage() {
  const [showModal, setShowModal] = useState(false)
  return (
    <SearchPage
      blocks={[
        <>
          <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal(true)}>
            + Issue Certificate
          </Button>
          {showModal && <CertificateFormModal isProgram={true} closeModal={() => setShowModal(false)} />}
        </>
      ]}
      title="Manage Certificates"
      initialFilter={{}}
      meta={ProgramCertificateSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getCertificateTableColumns(false)
      }}
    ></SearchPage>
  )
}
