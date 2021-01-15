import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { DiscountProgramsSearchMeta } from "~/FormMeta/DiscountPrograms/DiscountProgramsSearchMeta"
import { getDiscountProgramsTableColumns } from "~/FormMeta/DiscountPrograms/DiscountProgramsTableColumns"

export default function DiscountProgramPage() {
  return (
    <SearchPage
      title="Manage Discount Programs"
      meta={DiscountProgramsSearchMeta}
      hideSearchField={false}
      tableProps={getDiscountProgramsTableColumns()}
    />
  )
}
