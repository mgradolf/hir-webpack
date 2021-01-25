import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { InstructorContractsSearchMeta } from "~/FormMeta/InstructorContracts/InstructorContractsSearchMeta"
import { getInstructorContractsTableColumns } from "~/FormMeta/InstructorContracts/InstructorContractsTableColumns"

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
