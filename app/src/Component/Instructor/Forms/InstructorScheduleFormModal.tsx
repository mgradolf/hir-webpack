import { Form } from "antd"
import React, { useState, useEffect } from "react"
import Modal from "~/Component/Common/Modal/index2"
import { IInstructorScheduleFieldNames } from "~/Component/Instructor/Interfaces"
import InstructorScheduleForm from "~/Component/Instructor/Forms/InstructorScheduleForm"
import { findEntitySchedule } from "~/ApiServices/Service/EntityService"

interface IInstructorScheduleFormModalProps {
  PersonID?: number
  ScheduleID?: number
  closeModal?: () => void
}

const fieldNames: IInstructorScheduleFieldNames = {
  ScheduleID: "ScheduleID",
  PersonID: "PersonID",
  Name: "Name",
  Description: "Description",
  StartDate: "StartDate",
  EndDate: "EndDate",
  RecurringDate: "RecurringDate",
  Days: "Days"
}

export default function InstructorScheduleFormModal(props: IInstructorScheduleFormModalProps) {
  const [formInstance] = Form.useForm()
  const [editMode, setEditMode] = useState(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>({ PersonID: props.PersonID })

  useEffect(() => {
    ;(async () => {
      if (props.ScheduleID) {
        const response = await findEntitySchedule({ ScheduleID: props.ScheduleID })
        setEditMode(true)
        if (response && response.success) {
          Object.keys(response.data).forEach((x) => {
            formInstance.setFieldsValue({ [x]: response.data[x] })
          })
        } else {
          if (props.closeModal) {
            props.closeModal()
          }
        }
      }
    })()
  }, [props, formInstance])

  return (
    <Modal width="1000px" apiCallInProgress={apiCallInProgress}>
      <InstructorScheduleForm
        title={"Schedule"}
        editMode={editMode}
        fieldNames={fieldNames}
        initialFormValue={initialFormValue}
        formInstance={formInstance}
        setApiCallInProgress={setApiCallInProgress}
        closeModal={props.closeModal}
      />
    </Modal>
  )
}
