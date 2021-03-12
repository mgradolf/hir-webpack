import React from "react"
import { InstructorSearchMeta } from "~/TableSearchMeta/Instructor/InstructorSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getInstructorTableColumns } from "~/TableSearchMeta/Instructor/InstructorTableColumns"
import { PersonFormOpenButton } from "~/Component/Person/Forms/CreateEdit/PersonForm"

export default function InstructorPage() {
  return (
    <SearchPage
      blocks={[<PersonFormOpenButton label={"Create Instructor"} initialValues={{ Roles: [2] }} />]}
      title="Manage Instructors"
      meta={InstructorSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getInstructorTableColumns()
      }}
    ></SearchPage>
  )
}
