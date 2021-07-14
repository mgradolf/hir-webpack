import React from "react"
import { Link } from "react-router-dom"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderBoolean, renderDate, renderEmail } from "~/Component/Common/ResponsiveTable"

export const getWaitlistEntriesDetailsMeta = (waitlistEntry: { [key: string]: any }): IDetailsMeta => {
  const tabMeta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      {
        label: "Account",
        value: <Link to={`/account/${waitlistEntry.AccountID}`}>{waitlistEntry.AccountName}</Link>
      },
      {
        label: "Section Number",
        value: <Link to={`/section/${waitlistEntry.SectionID}`}>{waitlistEntry.SectionNumber}</Link>
      },
      {
        label: "Seat Group",
        value: <Link to={`/seatgroup/${waitlistEntry.SeatGroupID}`}>{waitlistEntry.SeatGroupName}</Link>
      },
      {
        label: "Purchaser",
        value: <Link to={`/person/${waitlistEntry.PurchaserID}`}>{waitlistEntry.PurchaserName}</Link>
      },
      { label: "Administrated By UID", value: waitlistEntry.AdministratedByUID },
      { label: "Creation Time", value: waitlistEntry.CreationTime, render: renderDate },
      { label: "Invitation Email To Requester", value: waitlistEntry.InvitationEmailToRequester, render: renderEmail },
      { label: "Priority", value: waitlistEntry.Priority },
      { label: "Request Expiration Time", value: waitlistEntry.RequestExpirationTime, render: renderDate },
      { label: "Request State", value: waitlistEntry.RequestState },
      { label: "Source", value: waitlistEntry.Source },
      {
        label: "Student",
        value: <Link to={`/person/student/${waitlistEntry.StudentID}`}>{waitlistEntry.StudentName}</Link>
      },
      { label: "Student Email Address", value: waitlistEntry.StudentEmailAddress, render: renderEmail },
      { label: "Active", value: waitlistEntry.IsActive, render: renderBoolean }
    ]
  }

  tabMeta.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      summary: [summary]
    }
  })

  return {
    tabs: tabMeta
  }
}
