import React from "react"
import { Menu } from "antd"

import ScheduleEditLink from "~/Component/Feature/Section/Schedule/ScheduleEditLink"
import ScheduleRemoveLink from "~/Component/Feature/Section/Schedule/ScheduleRemoveLink"

interface IScheduleMenu {
  sectionId: number
  scheduleId: number
}

export default function ScheduleMenu(props: IScheduleMenu) {
  return (
    <Menu>
      <Menu.Item key="0">
        <ScheduleEditLink sectionId={props.sectionId} scheduleIds={props.scheduleId} />
      </Menu.Item>
      <Menu.Item key="1">
        <ScheduleRemoveLink scheduleId={props.scheduleId} />
      </Menu.Item>
    </Menu>
  )
}
