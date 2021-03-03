import React, { useState } from "react"
import { Button, Menu } from "antd"
import { MetaDrivenFormModal } from "~/Component/Common/Modal/MetaDrivenFormModal/MetaDrivenFormModal"
import { StudentHoldFormMeta } from "~/Component/Student/FormMeta/StudentHoldFormMeta"
import { createUpdateStudentHold, releaseStudentHold } from "~/ApiServices/Service/StudentService"
import { StudentReleaseFormMeta } from "~/Component/Student/FormMeta/StudentReleaseFormMeta"

interface IStudentHoldMenu {
  initialData: { [key: string]: any }
  studentID: number
}

export function StudentHoldMenu(props: IStudentHoldMenu) {
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showReleaseModal, setShowReleaseModal] = useState(false)

  return (
    <Menu>
      <Menu.Item key="0">
        <Button
          type="link"
          onClick={() => {
            setShowUpdateModal(true)
          }}
        >
          Edit
        </Button>
        {showUpdateModal && (
          <MetaDrivenFormModal
            meta={StudentHoldFormMeta}
            title={"Edit Hold"}
            initialFormValue={{ ...props.initialData, StudentID: props.studentID }}
            defaultFormValue={{ ...props.initialData, StudentID: props.studentID }}
            formSubmitApi={createUpdateStudentHold}
            refreshEventAfterFormSubmission={"REFRESH_HOLD_TAB"}
            closeModal={() => setShowUpdateModal(false)}
          />
        )}
      </Menu.Item>
      <Menu.Item key="1">
        <Button
          type="link"
          danger
          onClick={() => {
            setShowReleaseModal(true)
          }}
        >
          Release
        </Button>
        {showReleaseModal && (
          <MetaDrivenFormModal
            meta={StudentReleaseFormMeta}
            title={"Release Hold"}
            initialFormValue={{ ...props.initialData, StudentID: props.studentID }}
            defaultFormValue={{ ...props.initialData, StudentID: props.studentID }}
            formSubmitApi={releaseStudentHold}
            refreshEventAfterFormSubmission={"REFRESH_HOLD_TAB"}
            closeModal={() => setShowReleaseModal(false)}
          />
        )}
      </Menu.Item>
    </Menu>
  )
}
