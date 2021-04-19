import React, { useState } from "react"
import { Button } from "antd"
import ScheduleNoteFormModal from "~/Component/Feature/Section/Schedule/ScheduleNoteFormModal"

interface IScheduleNoteButtonProp {
  scheduleIds: any
}

export default function ScheduleNoteModalButton(props: IScheduleNoteButtonProp) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Button type="link" onClick={() => setShowModal && setShowModal(true)}>
        Note
      </Button>
      {showModal && <ScheduleNoteFormModal scheduleIds={props.scheduleIds} closeModal={() => setShowModal(false)} />}
    </>
  )
}
