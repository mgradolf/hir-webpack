import React, { useState } from "react"
import { Button } from "antd"
import { addInstructorToOffering } from "~/ApiServices/Service/InstructorService"
import { eventBus, REFRESH_OFFERING_QUALIFIED_INSTRUCTOR_PAGE } from "~/utils/EventBus"
import { AddInstructorModal } from "~/Component/Feature/Offering/QualifiedInstructor/AddInstructorModal"

interface ICreateActionButtonProp {
  OfferingID: number
  CanTeachOfferingID?: number
}

export function AddInstructorButton(props: ICreateActionButtonProp) {
  const [openModal, setOpenModal] = useState(false)
  const onClick = () => {
    setOpenModal(true)
  }
  const onClose = (selectedItems?: any[]) => {
    if (selectedItems) {
      selectedItems.map((x) => {
        addInstructorToOffering({ FacultyID: x.FacultyID, OfferingID: props.OfferingID }).then((x) => {
          if (x.success) eventBus.publish(REFRESH_OFFERING_QUALIFIED_INSTRUCTOR_PAGE)
        })
        return true
      })
      setOpenModal(false)
    } else {
      setOpenModal(false)
    }
  }
  return (
    <>
      {openModal && <AddInstructorModal {...props} onClose={onClose} />}
      <Button type="primary" onClick={onClick}>
        + Add Instructor
      </Button>
    </>
  )
}
