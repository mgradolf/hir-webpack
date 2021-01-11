import React, { useState } from "react"
import { Button } from "antd"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { OfferingSearchMeta } from "~/FormMeta/Offering/OfferingSearchMeta"
import OfferingFormModal from "~/Component/Offering/CreateEdit/OfferingFormModal"
import { getOfferingTableColumns } from "~/FormMeta/Offering/OfferingTableColumns"

export function OfferingPage() {
  const [showModal, setShowModal] = useState(false)

  return (
    <SearchPage
      blocks={[
        <>
          <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal(true)}>
            + Create Offering
          </Button>
          {showModal && <OfferingFormModal closeModal={() => setShowModal(false)} />}
        </>
      ]}
      title="Manage Offerings"
      meta={OfferingSearchMeta}
      tableProps={{
        ...getOfferingTableColumns()
      }}
    ></SearchPage>
  )
}
