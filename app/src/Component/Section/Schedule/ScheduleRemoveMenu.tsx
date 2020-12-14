import React from "react"
import { Button, Dropdown, Menu } from "antd"
import {
  removeMeetings,
  removeLocations,
  removeInstructors,
  removeMeetingInformations
} from "~/ApiServices/Service/SectionService"
import { eventBus, REFRESH_SECTION_SCHEDULE_PAGE } from "~/utils/EventBus"

interface IScheduleRemoveMenuProp {
  sectionId: number
  scheduleIds: Array<any>
  setLoading: (flag: boolean) => void
  style?: React.CSSProperties
}

export default function ScheduleRemoveMenu(props: IScheduleRemoveMenuProp) {
  const deleteSchedules = async () => {
    props.setLoading(true)
    const response = await removeMeetings({ ScheduleIDs: props.scheduleIds })
    if (response.success) {
      eventBus.publish(REFRESH_SECTION_SCHEDULE_PAGE)
    } else {
      console.log(response.error)
    }
    props.setLoading(false)
  }

  const deleteLocations = async () => {
    props.setLoading(true)
    const response = await removeLocations({ ScheduleIDs: props.scheduleIds })
    if (response.success) {
      eventBus.publish(REFRESH_SECTION_SCHEDULE_PAGE)
    } else {
      console.log(response.error)
    }
    props.setLoading(false)
  }

  const deleteInstructors = async () => {
    props.setLoading(true)
    const response = await removeInstructors({ ScheduleIDs: props.scheduleIds })
    if (response.success) {
      eventBus.publish(REFRESH_SECTION_SCHEDULE_PAGE)
    } else {
      console.log(response.error)
    }
    props.setLoading(false)
  }

  const deleteNotes = async () => {
    props.setLoading(true)
    const response = await removeMeetingInformations({ ScheduleIDs: props.scheduleIds })
    if (response.success) {
      eventBus.publish(REFRESH_SECTION_SCHEDULE_PAGE)
    } else {
      console.log(response.error)
    }
    props.setLoading(false)
  }

  const getMenu = () => {
    return (
      <Menu>
        <Menu.Item>
          <Button type="link" onClick={deleteSchedules}>
            Schedule
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button type="link" onClick={deleteLocations}>
            Location
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button type="link" onClick={deleteInstructors}>
            Instructor
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button type="link" onClick={deleteNotes}>
            Notes
          </Button>
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <Dropdown.Button
      disabled={props.scheduleIds.length > 0 ? false : true}
      overlay={getMenu()}
      type="primary"
      style={props.style}
    >
      Removes
    </Dropdown.Button>
  )
}
