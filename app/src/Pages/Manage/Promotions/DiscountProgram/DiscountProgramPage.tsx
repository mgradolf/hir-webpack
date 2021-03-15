import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { DiscountProgramsSearchMeta } from "~/TableSearchMeta/DiscountPrograms/DiscountProgramsSearchMeta"
import { getDiscountProgramsTableColumns } from "~/TableSearchMeta/DiscountPrograms/DiscountProgramsTableColumns"

export default function DiscountProgramPage() {
  return (
    <SearchPage
      title="Manage Discount Programs"
      meta={DiscountProgramsSearchMeta}
      metaName="DiscountProgramsSearchMeta"
      hideSearchField={false}
      tableProps={getDiscountProgramsTableColumns()}
    />
  )
}
