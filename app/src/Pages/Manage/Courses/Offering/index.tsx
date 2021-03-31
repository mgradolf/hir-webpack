import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { OfferingSearchMeta } from "~/TableSearchMeta/Offering/OfferingSearchMeta"
import { getOfferingTableColumns } from "~/TableSearchMeta/Offering/OfferingTableColumns"
import { OfferingCreateFormModalOpenButton } from "~/Component/Offering/OfferingFormModal"

export function OfferingPage() {
  return (
    <SearchPage
      blocks={[<OfferingCreateFormModalOpenButton />]}
      title="Manage Offerings"
      meta={OfferingSearchMeta}
      metaName="OfferingSearchMeta"
      tableProps={{
        ...getOfferingTableColumns()
      }}
    ></SearchPage>
  )
}
