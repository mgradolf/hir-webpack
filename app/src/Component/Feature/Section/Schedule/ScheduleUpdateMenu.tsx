import React from "react"
import { Dropdown, Menu } from "antd"
import { ScheduleCreateButton } from "~/Component/Feature/Section/Schedule/ScheduleCreateModal"
import UpdateLocationModal from "~/Component/Feature/Section/Schedule/UpdateLocationModal"
import UpdateInstructorModal from "~/Component/Feature/Section/Schedule/UpdateInstructorModal"
import UpdateNoteModal from "~/Component/Feature/Section/Schedule/UpdateNoteModal"

interface IScheduleUpdateMenuProp {
  sectionId: number
  scheduleIds: Array<any>
  style?: React.CSSProperties
}

export default function ScheduleUpdateMenu(props: IScheduleUpdateMenuProp) {
  const getMenu = (sectionId: number, scheduleIds: Array<any>) => {
    return (
      <Menu>
        <Menu.Item>
          <ScheduleCreateButton sectionId={sectionId} scheduleIds={scheduleIds} />
        </Menu.Item>
        <Menu.Item>
          <UpdateLocationModal scheduleIds={scheduleIds} />
        </Menu.Item>
        <Menu.Item>
          <UpdateInstructorModal sectionId={sectionId} scheduleIds={scheduleIds} />
        </Menu.Item>
        <Menu.Item>
          <UpdateNoteModal scheduleIds={scheduleIds} />
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <Dropdown.Button
      disabled={props.scheduleIds.length > 0 ? false : true}
      overlay={getMenu(props.sectionId, props.scheduleIds)}
      type="primary"
      style={props.style}
    >
      Updates
    </Dropdown.Button>
  )
}
