import React from "react"
import { Link } from "react-router-dom"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderBoolean } from "~/Component/Common/ResponsiveTable"

export const getBuildingTypeDetailsMeta = (account: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      { label: "Room Number", value: account.RoomNumber },
      { label: "Room Type", value: account.RoomUseType },
      { label: "Mail Stop", value: account.MailStop },
      { label: "Building", value: account.BuildingName,      
      render: (text: any, record: any) => (isModal ? text : <Link to={`/building/${record.BuildingID}`}>{text}</Link>) 
      },
      { label: "Site", value: account.SiteName,      
      render: (text: any, record: any) => (isModal ? text : <Link to={`/site/${record.SiteID}`}>{text}</Link>) 
      },
      { label: "Floor", value: account.BuildingFloor },
      { label: "Capacity", value: account.Capacity },
      { label: "Accessible", value: account.IsHandicapAccess, render: renderBoolean }
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
