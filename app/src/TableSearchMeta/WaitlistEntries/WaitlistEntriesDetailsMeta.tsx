import React from "react"
import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"

export const getWaitlistEntriesDetailsMeta = (waitlistEntry: { [key: string]: any }): IDetailsMeta => {
  const tabMeta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      { label: "AccountID", value: waitlistEntry.AccountID },
      { label: "AccountName", value: waitlistEntry.AccountName },
      { label: "AdministratedByUID", value: waitlistEntry.AdministratedByUID },
      { label: "CreationTime", value: waitlistEntry.CreationTime },
      { label: "InvitationEmailToRequester", value: waitlistEntry.InvitationEmailToRequester },
      { label: "IsActive", value: waitlistEntry.IsActive },
      { label: "OfferingID", value: waitlistEntry.OfferingID },
      { label: "Priority", value: waitlistEntry.Priority },
      { label: "PurchaserID", value: waitlistEntry.PurchaserID },
      { label: "PurchaserName", value: waitlistEntry.PurchaserName },
      { label: "RequestExpirationTime", value: waitlistEntry.RequestExpirationTime },
      { label: "RequestID", value: waitlistEntry.RequestID },
      { label: "RequestState", value: waitlistEntry.RequestState },
      { label: "SeatGroupID", value: waitlistEntry.SeatGroupID },
      { label: "SeatGroupName", value: waitlistEntry.SeatGroupName },
      { label: "SectionID", value: waitlistEntry.SectionID },
      { label: "SectionNumber", value: waitlistEntry.SectionNumber },
      { label: "Source", value: waitlistEntry.Source },
      { label: "SourceID", value: waitlistEntry.SourceID },
      { label: "StudentEmailAddress", value: waitlistEntry.StudentEmailAddress },
      { label: "StudentID", value: waitlistEntry.StudentID },
      { label: "StudentName", value: waitlistEntry.StudentName },
      { label: "WaitListEntryID", value: waitlistEntry.WaitListEntryID }
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
