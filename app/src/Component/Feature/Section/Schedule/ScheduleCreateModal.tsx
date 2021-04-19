import React, { useState } from "react"
import { Button } from "antd"
import { CreateEditRemoveIconButton } from "~/Component/Common/Form/Buttons/CreateEditRemoveIconButton"
import ScheduleFormModal from "~/Component/Feature/Section/Schedule/ScheduleFormModal"

interface IScheduleCreateFormProp {
  sectionId: number
  scheduleIds?: any
}

export function ScheduleCreateButton(props: IScheduleCreateFormProp) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      {Array.isArray(props.scheduleIds) && (
        <Button type="link" onClick={() => setShowModal && setShowModal(true)}>
          Schedule
        </Button>
      )}
      {!Array.isArray(props.scheduleIds) && (
        <CreateEditRemoveIconButton
          toolTip="Create Schedule"
          iconType="create"
          onClick={() => setShowModal && setShowModal(true)}
        />
      )}
      {showModal && (
        <ScheduleFormModal
          sectionId={props.sectionId}
          scheduleIds={props.scheduleIds}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  )
}
