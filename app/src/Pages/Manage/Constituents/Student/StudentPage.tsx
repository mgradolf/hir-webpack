import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getStudentTableColumns } from "~/FormMeta/Student/StudentTableColumns"
import { studentSearchMeta } from "~/FormMeta/Student/StudentSearchMeta"

export default function PersonTable() {
  return (
    <SearchPage
      title="Manage Students"
      meta={studentSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getStudentTableColumns()
      }}
      helpKey="https://docs.google.com/document/d/1FKV-i5gsVClhsHLYFMqpdEGDVZmwJU576AXKKcTfwiY/edit?usp=sharing"
    ></SearchPage>
  )
}
