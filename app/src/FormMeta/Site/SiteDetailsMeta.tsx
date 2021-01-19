import React from "react"
import { Link } from "react-router-dom"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderBoolean } from "~/Component/Common/ResponsiveTable"

export const getSiteDetailsMeta = (account: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      { label: "Site Code", value: account.SiteCode },
      { label: "Parent Organization", value: account.OrganizationName },
      { label: "Directions", value: account.Attribute1 },
      { label: "Parking", value: account.Attribute2},
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
  return {
    pageTitle: `${account.Name}`,
    tabs: meta
  }
}
