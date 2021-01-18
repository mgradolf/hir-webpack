import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { OfferingTypeSearchMeta } from "~/FormMeta/OfferingType/OfferingTypeSearchMeta"
import { getOfferingTypeTableColumns } from "~/FormMeta/OfferingType/OfferingTypeTableColumns"

export default function OfferingTypePage() {
  return (
    <SearchPage
      title="Offering Types"
      meta={OfferingTypeSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getOfferingTypeTableColumns()
      }}
    ></SearchPage>
  )
}
