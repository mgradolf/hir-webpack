import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { OfferingTypeSearchMeta } from "~/TableSearchMeta/OfferingType/OfferingTypeSearchMeta"
import { getOfferingTypeTableColumns } from "~/TableSearchMeta/OfferingType/OfferingTypeTableColumns"

export default function OfferingTypePage() {
  return (
    <SearchPage
      title="Offering Types"
      meta={OfferingTypeSearchMeta}
      helpKey="administrationDataSearchOfferingTypes"
      metaName="OfferingTypeSearchMeta"
      hideSearchField={false}
      tableProps={{
        ...getOfferingTypeTableColumns()
      }}
    ></SearchPage>
  )
}
