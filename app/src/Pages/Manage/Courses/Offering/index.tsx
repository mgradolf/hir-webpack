import React, { useState } from "react"
import { Button } from "antd"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { OfferingSearchMeta } from "~/TableSearchMeta/Offering/OfferingSearchMeta"
import OfferingFormModal from "~/Component/Offering/CreateEdit/OfferingFormModal"
import { getOfferingTableColumns } from "~/TableSearchMeta/Offering/OfferingTableColumns"
import { usePermissionHook } from "~/Hooks/PermissionHook"
import { OfferingServiceConfig } from "~/ApiServices/Service/OfferingService"

export function OfferingPage() {
  const [showModal, setShowModal] = useState(false)
  const permission = usePermissionHook(OfferingServiceConfig.Service, OfferingServiceConfig.Actions.searchOffering)
  return (
    <SearchPage
      permission={permission}
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
