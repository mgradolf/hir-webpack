import React from "react"
import { Button, Dropdown, Menu } from "antd"
import {
  removeMeetings,
  removeLocations,
  removeInstructors,
  removeMeetingInformations
} from "~/ApiServices/Service/SectionService"
import { eventBus, REFRESH_SECTION_SCHEDULE_PAGE } from "~/utils/EventBus"
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"

interface IScheduleRemoveMenuProp {
  sectionId: number
  scheduleIds: Array<any>
  setLoading: (flag: boolean) => void
  style?: React.CSSProperties
}

export default function ScheduleRemoveMenu(props: IScheduleRemoveMenuProp) {
  const getMenu = () => {
    return (
      <Menu>
        <Menu.Item>
          <Button
            type="link"
            onClick={() =>
              showDeleteConfirm(() => {
                return removeMeetings({ ScheduleIDs: props.scheduleIds }).then((x) => {
                  if (x.success) {
                    eventBus.publish(REFRESH_SECTION_SCHEDULE_PAGE)
                  }
                  return x
                })
              })
            }
          >
            Schedule
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button
            type="link"
            onClick={() =>
              showDeleteConfirm(() => {
                return removeLocations({ ScheduleIDs: props.scheduleIds }).then((x) => {
                  if (x.success) {
                    eventBus.publish(REFRESH_SECTION_SCHEDULE_PAGE)
                  }
                  return x
                })
              })
            }
          >
            Location
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button
            type="link"
            onClick={() =>
              showDeleteConfirm(() => {
                return removeInstructors({ ScheduleIDs: props.scheduleIds }).then((x) => {
                  if (x.success) {
                    eventBus.publish(REFRESH_SECTION_SCHEDULE_PAGE)
                  }
                  return x
                })
              })
            }
          >
            Instructor
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button
            type="link"
            onClick={() =>
              showDeleteConfirm(() => {
                return removeMeetingInformations({ ScheduleIDs: props.scheduleIds }).then((x) => {
                  if (x.success) {
                    eventBus.publish(REFRESH_SECTION_SCHEDULE_PAGE)
                  }
                  return x
                })
              })
            }
          >
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
