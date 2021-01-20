import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderBoolean, renderLink } from "~/Component/Common/ResponsiveTable"

export const getBuildingTypeDetailsMeta = (account: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      { label: "Building Number", value: account.BuildingNumber },
      {
        label: "Site",
        value: account.SiteName,
        render: (value) => renderLink(`/site/${account.SiteID}`, account.SiteName)
      },
      { label: "Number of Floor", value: account.Floors },
      { label: "Active", value: account.IsActive, render: renderBoolean }
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
    pageTitle: `${account.Name}`,
    tabs: meta
  }
}
