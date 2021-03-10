import React, { useState } from "react"
import { Button, Menu } from "antd"
import { eventBus } from "~/utils/EventBus"
import { removeSchedule } from "~/ApiServices/BizApi/scheduling/schedulingIF"
import InstructorScheduleFormModal from "~/Component/Instructor/Forms/InstructorScheduleFormModal"

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
          <InstructorScheduleFormModal
            ScheduleID={props.initialData.ScheduleID}
            PersonID={props.initialData.PersonID}
            closeModal={() => setShowUpdateModal(false)}
          />
        )}
      </Menu.Item>
      <Menu.Item key="1">
        <Button
          type="link"
          onClick={async () => {
            const response = await removeSchedule({
              ScheduleID: props.initialData.ScheduleID
            })
            if (response && response.success) {
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
