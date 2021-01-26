import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderBoolean, renderLink } from "~/Component/Common/ResponsiveTable"
import { getInstructorScheduleTableColumns } from "~/FormMeta/InstructorSchedule/ScheduleTableColumns"

export const getRoomDetailsMeta = (room: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      { label: "Room Number", value: room.RoomNumber },
      { label: "Room Type", value: room.RoomUseType },
      { label: "Mail Stop", value: room.MailStop },
      {
        label: "room",
        value: room.roomName,
        render: (text: any) => renderLink(`/room/${room.roomID}`, room.roomName)
      },
      {
        label: "Site",
        value: room.SiteName,
        render: (text: any) => renderLink(`/site/${room.SiteID}`, room.SiteName)
      },
      { label: "Floor", value: room.roomFloor },
      { label: "Capacity", value: room.Capacity },
      { label: "Accessible", value: room.IsHandicapAccess, render: renderBoolean },
      { label: "Active", value: room.IsActive, render: renderBoolean }
    ]
  }

  meta.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      summary: [summary]
    }
  })

  meta.push({
    tabTitle: "Schedule",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getInstructorScheduleTableColumns(),
        searchParams: { RoomID: room.RoomID },
        refreshEventName: "REFRESH_SCHEDULE_TAB"
      }
    }
  })
  return {
    pageTitle: `${room.Name}`,
    tabs: meta
  }
}
