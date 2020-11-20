import React, { useState } from "react"
import { Button } from "antd"
import SearchPage from "~/Component/Common/Page/SearchPage"
import { CertificateSearchMeta } from "~/FormMeta/Certificate/CertificateSearchMeta"
import { getCertificateTableColumns } from "~/FormMeta/Certificate/CertificateTableColumns"

export default function Certificate() {
  const [showModal, setShowModal] = useState(false)

  return (
    <SearchPage
      blocks={[
        <>
          <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal(true)}>
            + Issue Certificate
          </Button>
          {/* {showModal && <OfferingFormModal closeModal={() => setShowModal(false)} />} */}
        </>
      ]}
      title="Manage Certificates"
      initialFilter={{}}
      meta={CertificateSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getCertificateTableColumns(),
        bordered: true
      }}
    ></SearchPage>
  )
}
