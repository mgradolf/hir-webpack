import React, { useState } from "react"
import { Button } from "antd"
import { MetaDrivenFormModal } from "~/Component/Common/Modal/MetaDrivenFormModal/MetaDrivenFormModal"
import { releaseStudentHold } from "~/ApiServices/Service/StudentService"
import { StudentReleaseFormMeta } from "~/Component/Feature/Student/FormMeta/StudentReleaseFormMeta"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { StudentHoldFormModal } from "~/Component/Feature/Student/StudentHoldFormModal"
import moment from "moment"

interface IStudentHoldMenu {
  initialData: { [key: string]: any }
  studentID: number
}

export function StudentHoldMenu(props: IStudentHoldMenu) {
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showReleaseModal, setShowReleaseModal] = useState(false)

  const releaseDate = moment(props.initialData.ReleaseDate)
  const now = moment()

  return (
    <>
      <Button
        type="primary"
        icon={<EditOutlined />}
        shape="circle"
        disabled={props.initialData.ReleaseReasonID || now > releaseDate}
        style={{ marginRight: "5px" }}
        onClick={() => {
          setShowUpdateModal(true)
        }}
      />
      {showUpdateModal && (
        <StudentHoldFormModal
          initialData={{ ...props.initialData, StudentID: props.studentID }}
          closeModal={() => setShowUpdateModal(false)}
        />
      )}
      <Button
        type="primary"
        danger
        disabled={props.initialData.ReleaseReasonID || now > releaseDate}
        icon={<DeleteOutlined />}
        shape="circle"
        onClick={() => {
          setShowReleaseModal(true)
        }}
      />
      {showReleaseModal && (
        <MetaDrivenFormModal
          meta={StudentReleaseFormMeta}
          metaName="StudentReleaseFormMeta"
          title={"Release Hold"}
          initialFormValue={{ ...props.initialData, StudentID: props.studentID }}
          defaultFormValue={{ StudentHoldID: props.initialData.StudentHoldID, StudentID: props.studentID }}
          formSubmitApi={releaseStudentHold}
          refreshEventAfterFormSubmission={"REFRESH_HOLD_TAB"}
          closeModal={() => setShowReleaseModal(false)}
        />
      )}
    </>
  )
}
