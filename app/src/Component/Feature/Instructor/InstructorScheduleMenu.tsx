import React, { useState } from "react"
import { Button, message, Tooltip } from "antd"
import { eventBus } from "~/utils/EventBus"
import InstructorScheduleFormModal from "~/Component/Feature/Instructor/Forms/InstructorScheduleFormModal"
import { removeInstructorSchedule } from "~/ApiServices/Service/InstructorService"
import { DELETE_SUCCESSFULLY } from "~/utils/Constants"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"

interface IInstructorScheduleMenu {
  initialData: { [key: string]: any }
}

export default function InstructorScheduleMenu(props: IInstructorScheduleMenu) {
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  return (
    <>
      <Tooltip title="Edit">
        <Button
          type="primary"
          icon={<EditOutlined />}
          shape="circle"
          onClick={() => {
            setShowUpdateModal(true)
          }}
        />
      </Tooltip>
      {showUpdateModal && (
        <InstructorScheduleFormModal initialData={props.initialData} closeModal={() => setShowUpdateModal(false)} />
      )}
      <Tooltip title="Remove">
        <Button
          danger
          type="primary"
          icon={<DeleteOutlined />}
          shape="circle"
          style={{ marginLeft: "5px" }}
          onClick={async () => {
            const response = await removeInstructorSchedule({
              ScheduleID: props.initialData.ScheduleID
            })
            if (response && response.success) {
              message.success(DELETE_SUCCESSFULLY)
              eventBus.publish("REFRESH_FACULTY_SCHEDULE_TAB")
            }
          }}
        />
      </Tooltip>
    </>
  )
}
