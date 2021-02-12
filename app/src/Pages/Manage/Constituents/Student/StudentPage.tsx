import React, { useState } from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getStudentTableColumns } from "~/FormMeta/Student/StudentTableColumns"
import { studentSearchMeta } from "~/FormMeta/Student/StudentSearchMeta"
import { Button } from "antd"
import StudentFormModal from "~/Component/Student/StudentFormModal"

export default function PersonTable() {
  const [showModal, setShowModal] = useState(false)
  return (
    <SearchPage
      blocks={[
        <>
          <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal(true)}>
            + Create Student
          </Button>
          {showModal && <StudentFormModal closeModal={() => setShowModal(false)} />}
        </>
      ]}
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
