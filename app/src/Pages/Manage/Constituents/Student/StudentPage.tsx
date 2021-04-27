import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getStudentTableColumns } from "~/TableSearchMeta/Student/StudentTableColumns"
import { StudentSearchMeta } from "~/TableSearchMeta/Student/StudentSearchMeta"
import { PersonFormOpenButton } from "~/Component/Feature/Person/Forms/CreateEdit/PersonFormWithConfig"

export default function PersonTable() {
  return (
    <SearchPage
      blocks={[
        <PersonFormOpenButton
          label={"Create Student"}
          buttonIcon="create"
          initialValues={{ Roles: [1] }}
          helpKey="createStudent"
        />
      ]}
      title="Manage Students"
      meta={StudentSearchMeta}
      metaName="StudentSearchMeta"
      hideSearchField={false}
      tableProps={{
        ...getStudentTableColumns()
      }}
      helpKey="searchStudents"
    ></SearchPage>
  )
}
