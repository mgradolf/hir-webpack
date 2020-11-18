import React from "react"
import { InstructorSearchMeta } from "~/FormMeta/Instructor/InstructorSearchMeta"
import SearchPage from "~/Component/Common/Page/SearchPage"
import { getInstructorTableColumns } from "~/FormMeta/Instructor/InstructorTableColumns"

export default function InstructorPage() {
  return (
    <SearchPage
      title="Manage Instructors"
      meta={InstructorSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getInstructorTableColumns()
      }}
    ></SearchPage>
  )
}
