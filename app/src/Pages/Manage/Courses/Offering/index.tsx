import React, { useState } from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { OfferingSearchMeta } from "~/TableSearchMeta/Offering/OfferingSearchMeta"
import { OfferingFormModal } from "~/Component/Feature/Offering/OfferingFormModal"
import { getOfferingTableColumns } from "~/TableSearchMeta/Offering/OfferingTableColumns"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"

export function OfferingPage() {
  const [showModal, setShowModal] = useState(false)
  return (
    <SearchPage
      blocks={[
        <>
          <IconButton toolTip="Create Offering" iconType="create" onClick={() => setShowModal(true)} />
          {showModal && <OfferingFormModal initialData={{}} closeModal={() => setShowModal(false)} />}
        </>
      ]}
      title="Manage Offerings"
      meta={OfferingSearchMeta}
      metaName="OfferingSearchMeta"
      tableProps={{
        ...getOfferingTableColumns()
      }}
    ></SearchPage>
  )
}
