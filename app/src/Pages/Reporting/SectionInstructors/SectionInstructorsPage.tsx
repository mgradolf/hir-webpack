import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { InstructorContractsSearchMeta } from "~/TableSearchMeta/InstructorContracts/InstructorContractsSearchMeta"
import { getInstructorContractsTableColumns } from "~/TableSearchMeta/InstructorContracts/InstructorContractsTableColumns"

export default function SectionInstructorsPage() {
  return (
    <SearchPage
      title="Section Instructor"
      meta={InstructorContractsSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getInstructorContractsTableColumns()
      }}
    ></SearchPage>
  )
}
