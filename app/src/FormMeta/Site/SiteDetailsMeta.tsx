import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderBoolean } from "~/Component/Common/ResponsiveTable"
import { getBuildingTypeTableColumns } from "~/FormMeta/Building/BuildingTypeTableColumns"

export const getSiteDetailsMeta = (record: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      { label: "Site Code", value: record.SiteCode },
      { label: "Parent Organization", value: record.OrganizationName },
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
  return {
    pageTitle: `${record.Name}`,
    tabs: meta
  }
}
