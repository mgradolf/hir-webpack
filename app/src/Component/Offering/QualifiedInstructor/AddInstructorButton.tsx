import React, { useState } from "react"
import { Button } from "antd"
import { AddInstructorModal } from "~/Component/Offering/QualifiedInstructor/AddInstructorModal"
import { onlyUnique } from "~/utils/util"
import { updateInstructors } from "~/ApiServices/Service/OfferingService"
import { eventBus, REFRESH_OFFERING_QUALIFIED_INSTRUCTOR_PAGE } from "~/utils/EventBus"

interface ICreateActionButtonProp {
  offeringID: number
  rowData: Array<any>
}

export function AddInstructorButton(props: ICreateActionButtonProp) {
  const [openModal, setOpenModal] = useState(false)
  const onClick = () => {
    setOpenModal(true)
  }
  const onClose = (selectedItems?: any[]) => {
    if (selectedItems) {
      const selectedInstructorIds = selectedItems.map((instructor) => instructor.FacultyID)
      let uniqueRowData = [...props.rowData.map((x) => x.instructorID), ...selectedInstructorIds]

      uniqueRowData = uniqueRowData.filter(onlyUnique)
      updateInstructors(props.offeringID, uniqueRowData)
        .then(() => eventBus.publish(REFRESH_OFFERING_QUALIFIED_INSTRUCTOR_PAGE))
        .finally(() => setOpenModal(false))
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
