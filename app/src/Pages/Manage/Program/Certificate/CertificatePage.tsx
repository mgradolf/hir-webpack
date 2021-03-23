import React, { useState } from "react"
import { Button } from "antd"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import CertificateFormModal from "~/Component/Feature/Certificate/CertificateFormModal"
import { ProgramCertificateSearchMeta } from "~/TableSearchMeta/Certificate/CertificateSearchMeta"
import { getCertificateTableColumns } from "~/TableSearchMeta/Certificate/CertificateTableColumns"

export default function () {
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
      meta={ProgramCertificateSearchMeta}
      metaName="ProgramCertificateSearchMeta"
      hideSearchField={false}
      tableProps={{
        ...getCertificateTableColumns(false)
      }}
    ></SearchPage>
  )
}
