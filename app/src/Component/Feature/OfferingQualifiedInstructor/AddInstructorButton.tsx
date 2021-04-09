import React, { useState } from "react"
import { addInstructorToOffering } from "~/ApiServices/Service/InstructorService"
import { eventBus, REFRESH_OFFERING_QUALIFIED_INSTRUCTOR_PAGE } from "~/utils/EventBus"
import { AddInstructorModal } from "~/Component/Feature/OfferingQualifiedInstructor/AddInstructorModal"
import { CreateEditRemoveIconButton } from "~/Component/Common/Form/Buttons/CreateEditRemoveIconButton"

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
      <CreateEditRemoveIconButton toolTip="Add Instructor" iconType="create" onClick={onClick} />
    </>
  )
}
