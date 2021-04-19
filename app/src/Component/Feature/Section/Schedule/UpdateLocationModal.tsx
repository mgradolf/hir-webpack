import React, { useState } from "react"
import { Button } from "antd"
import ScheduleLocationFormModal from "./ScheduleLocationFormModal"

interface IScheduleLocationButtonProp {
  scheduleIds: any
  openCreateScheduleLocationModal?: (scheduleIds: any) => void
}

export default function ScheduleLocationModalButton(props: IScheduleLocationButtonProp) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Button type="link" onClick={() => setShowModal && setShowModal(true)}>
        Location
      </Button>
      {showModal && (
        <ScheduleLocationFormModal scheduleIds={props.scheduleIds} closeModal={() => setShowModal(false)} />
      )}
    </>
  )
}
