import React, { useState } from "react"
import { Button } from "antd"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getStudentTableColumns } from "~/TableSearchMeta/Student/StudentTableColumns"
import { studentSearchMeta } from "~/TableSearchMeta/Student/StudentSearchMeta"
import StudentFormModal from "~/Component/Student/StudentFormModal"
import helpFileNameMap from "~/Config/HelpFileMap.json"

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
      helpKey={helpFileNameMap.generic}
    ></SearchPage>
  )
}
