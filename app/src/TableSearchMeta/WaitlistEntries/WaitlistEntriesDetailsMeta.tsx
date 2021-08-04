import React from "react"

import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"

import { Link } from "react-router-dom"

import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderBoolean, renderDate, renderEmail } from "~/Component/Common/ResponsiveTable"
import { WaitlistEntryFormOpenButton } from "~/Component/Feature/WaitlistEntries/WaitlistEntryForm"
import { WaitlistEntryRemoveLink } from "~/Component/Feature/WaitlistEntries/WaitlistEntryRemoveLink"

export const getWaitlistEntriesDetailsMeta = (waitlistEntry: { [key: string]: any }): IDetailsMeta => {
  const tabMeta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    title: "Basic",
    cardActions: [
      <WaitlistEntryFormOpenButton
        editMode={true}
        initialValues={{
          ...waitlistEntry,
          ManagedBy: waitlistEntry.AdministratedByUID === null ? "self" : "amdin",
          RequesterPersonID: waitlistEntry.PurchaserID,
          AccountDescriptor: waitlistEntry.AccountName,
          RecipientPersonID: waitlistEntry.StudentID
        }}
      />,
      <WaitlistEntryRemoveLink WaitListEntryID={waitlistEntry.WaitListEntryID} />
    ],
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
      { label: "Administrated By", value: waitlistEntry.AdministratedByUID },
      { label: "Creation Time", value: waitlistEntry.CreationTime, render: renderDate },
      {
        label: "Invitation Email To Requester",
        value: waitlistEntry.InvitationEmailToRequester,
        render: renderBoolean
      },
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
      actions: [<HelpButton helpKey="courseWaitlistEntriesSummaryTab" />],
      summary: [summary]
    }
  })

  return {
    tabs: tabMeta
  }
}
