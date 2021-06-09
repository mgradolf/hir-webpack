import React from "react"
import { InstructorSearchMeta } from "~/TableSearchMeta/Instructor/InstructorSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getInstructorTableColumns } from "~/TableSearchMeta/Instructor/InstructorTableColumns"
import { PersonFormOpenButton } from "~/Component/Feature/Person/Forms/CreateEdit/PersonFormWithConfig"

export default function InstructorPage() {
  return (
    <SearchPage
      blocks={[
        <PersonFormOpenButton
          label={"Create Instructor"}
          buttonIcon="create"
          initialValues={{ Roles: [2] }}
          helpKey="createInstructorForm"
        />
      ]}
      title="Manage Instructors"
      meta={InstructorSearchMeta}
      metaName="InstructorSearchMeta"
      hideSearchField={false}
      tableProps={{
        ...getInstructorTableColumns()
      }}
    ></SearchPage>
  )
}
