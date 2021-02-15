import React, { useState } from "react"
import { InstructorSearchMeta } from "~/TableSearchMeta/Instructor/InstructorSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getInstructorTableColumns } from "~/TableSearchMeta/Instructor/InstructorTableColumns"
import { Button } from "antd"
import { FormModal } from "~/Component/Common/Form/FormModal"
import { PersonFormMeta } from "~/TableSearchMeta/Person/Basic/PersonFormMeta"

export default function InstructorPage() {
  const [showModal, setShowModal] = useState(false)
  return (
    <SearchPage
      blocks={[
        <>
          <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal(true)}>
            + Create Instructor
          </Button>
          {showModal && (
            <FormModal
              meta={PersonFormMeta}
              title={"Create Instructor"}
              initialFormValue={{ RoleName: ["2"] }}
              formSubmitApi={(params: any) => {
                return Promise.resolve({ code: 200, data: [], error: false, success: true })
              }}
              closeModal={() => setShowModal(false)}
            ></FormModal>
          )}
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
