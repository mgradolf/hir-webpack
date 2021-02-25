import React from "react"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderBoolean } from "~/Component/Common/ResponsiveTable"
import { getBuildingTypeTableColumns } from "~/TableSearchMeta/Building/BuildingTypeTableColumns"
import { getInstructorScheduleTableColumns } from "~/TableSearchMeta/InstructorSchedule/ScheduleTableColumns"

export const getSiteDetailsMeta = (record: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      { label: "Site Code", value: record.SiteCode },
      {
        label: "Parent Organization",
        value: record.OrganizationName,
        render: (value) => <a href={`/webadmin/site/${record.OrganizationID}`}>{record.OrganizationName}</a>
      },
      { label: "Directions", value: record.Attribute1 },
      { label: "Parking", value: record.Attribute2 },
      { label: "Active", value: record.IsActive, render: renderBoolean }
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
    tabTitle: "Buildings",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getBuildingTypeTableColumns(),
        searchParams: { SiteID: record.SiteID },
        refreshEventName: "REFRESH_CONTACT_TAB"
      }
    }
  })

  meta.push({
    tabTitle: "Schedule",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getInstructorScheduleTableColumns(),
        searchParams: { SiteID: record.SiteID },
        refreshEventName: "REFRESH_SCHEDULE_TAB"
      }
    }
  })

  return {
    pageTitle: `${record.Name}`,
    tabs: meta
  }
}
