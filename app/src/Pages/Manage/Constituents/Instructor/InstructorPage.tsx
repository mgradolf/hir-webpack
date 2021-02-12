import React, { useState } from "react"
import { InstructorSearchMeta } from "~/FormMeta/Instructor/InstructorSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getInstructorTableColumns } from "~/FormMeta/Instructor/InstructorTableColumns"
import { Button } from "antd"
import InstructorFormModal from "~/Component/Instructor/InstructorFormModal"

export default function InstructorPage() {
  const [showModal, setShowModal] = useState(false)
  return (
    <SearchPage
      blocks={[
        <>
          <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal(true)}>
            + Create Instructor
          </Button>
          {showModal && <InstructorFormModal closeModal={() => setShowModal(false)} />}
        </>
      ]}
      title="Manage Instructors"
      meta={InstructorSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getInstructorTableColumns()
      }}
    ></SearchPage>
  )
}
