import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderBoolean, renderLink } from "~/Component/Common/ResponsiveTable"

export const getBuildingTypeDetailsMeta = (building: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      { label: "Room Number", value: building.RoomNumber },
      { label: "Room Type", value: building.RoomUseType },
      { label: "Mail Stop", value: building.MailStop },
      {
        label: "Building",
        value: building.BuildingName,
        render: (text: any) => renderLink(`/building/${building.BuildingID}`, building.BuildingName)
      },
      {
        label: "Site",
        value: building.SiteName,
        render: (text: any) => renderLink(`/site/${building.SiteID}`, building.SiteName)
      },
      { label: "Floor", value: building.BuildingFloor },
      { label: "Capacity", value: building.Capacity },
      { label: "Accessible", value: building.IsHandicapAccess, render: renderBoolean },
      { label: "Active", value: building.IsActive, render: renderBoolean }
    ]
  }

  meta.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      summary: [summary]
    }
  })

  //TODO: add tab for rooms
  return {
    pageTitle: `${building.Name}`,
    tabs: meta
  }
}
