import React, { useState } from "react"
import { Button } from "antd"
import ScheduleInstructorFormModal from "~/Component/Feature/Section/Schedule/ScheduleInstructorFormModal"

interface IScheduleInstructorButtonProp {
  sectionId: number
  scheduleIds: any
}

export default function ScheduleInstructorModalButton(props: IScheduleInstructorButtonProp) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Button type="link" onClick={() => setShowModal && setShowModal(true)}>
        Instructor
      </Button>
      {showModal && (
        <ScheduleInstructorFormModal
          sectionId={props.sectionId}
          scheduleIds={props.scheduleIds}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  )
}
