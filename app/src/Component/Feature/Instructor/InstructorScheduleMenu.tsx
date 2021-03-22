import React, { useState } from "react"
import { Button, Menu, message } from "antd"
import { eventBus } from "~/utils/EventBus"
import InstructorScheduleFormModal from "~/Component/Instructor/Forms/InstructorScheduleFormModal"
import { removeInstructorSchedule } from "~/ApiServices/Service/InstructorService"
import { DELETE_SUCCESSFULLY } from "~/utils/Constants"

interface IInstructorScheduleMenu {
  initialData: { [key: string]: any }
}

export default function InstructorScheduleMenu(props: IInstructorScheduleMenu) {
  const [showUpdateModal, setShowUpdateModal] = useState(false)

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
          <InstructorScheduleFormModal initialData={props.initialData} closeModal={() => setShowUpdateModal(false)} />
        )}
      </Menu.Item>
      <Menu.Item key="1">
        <Button
          type="link"
          onClick={async () => {
            const response = await removeInstructorSchedule({
              ScheduleID: props.initialData.ScheduleID
            })
            if (response && response.success) {
              message.success(DELETE_SUCCESSFULLY)
              eventBus.publish("REFRESH_FACULTY_SCHEDULE_TAB")
            }
          }}
        >
          Remove
        </Button>
      </Menu.Item>
    </Menu>
  )
}
