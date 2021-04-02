import React, { useState } from "react"
import { Button } from "antd"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import CertificateFormModal from "~/Component/Feature/Certificate/CertificateFormModal"
import { CourseCertificateSearchMeta } from "~/TableSearchMeta/Certificate/CertificateSearchMeta"
import { getCertificateTableColumns } from "~/TableSearchMeta/Certificate/CertificateTableColumns"

export default function Certificate() {
  const [showModal, setShowModal] = useState(false)

  return (
    <SearchPage
      blocks={[
        <>
          <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal(true)}>
            + Issue Certificate
          </Button>
          {showModal && <CertificateFormModal isProgram={false} closeModal={() => setShowModal(false)} />}
        </>
      ]}
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
