import React, { useState } from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { OfferingSearchMeta } from "~/TableSearchMeta/Offering/OfferingSearchMeta"
import OfferingFormModal from "~/Component/Feature/Offering/CreateEdit/OfferingFormModal"
import { getOfferingTableColumns } from "~/TableSearchMeta/Offering/OfferingTableColumns"
import { CreateEditRemoveIconButton } from "~/Component/Common/Form/Buttons/CreateEditRemoveIconButton"

export function OfferingPage() {
  const [showModal, setShowModal] = useState(false)

  return (
    <SearchPage
      blocks={[
        <>
          <CreateEditRemoveIconButton toolTip="Create Offering" iconType="create" onClick={() => setShowModal(true)} />
          {showModal && <OfferingFormModal closeModal={() => setShowModal(false)} />}
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
