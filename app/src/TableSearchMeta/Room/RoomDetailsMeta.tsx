import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderBoolean, renderLink } from "~/Component/Common/ResponsiveTable"
import { getInstructorScheduleTableColumns } from "~/TableSearchMeta/InstructorSchedule/ScheduleTableColumns"

export const getRoomDetailsMeta = (room: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      { label: "Room Number", value: room.RoomNumber },
      { label: "Room Type", value: room.RoomUseType },
      { label: "Mail Stop", value: room.MailStop },
      {
        label: "Room",
        value: room.Name,
        render: (text: any) => renderLink(`/room/${room.RoomID}`, room.Name)
      },
      {
        label: "Site",
        value: room.SiteName,
        render: (text: any) => renderLink(`/site/${room.SiteID}`, room.SiteName)
      },
      { label: "Floor", value: room.BuildingFloor },
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
        ...getInstructorScheduleTableColumns(undefined, room.RoomID),
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
