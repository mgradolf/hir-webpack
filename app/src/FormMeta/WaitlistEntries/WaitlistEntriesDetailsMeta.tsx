// import React from "react"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
// import { renderEmail } from "~/Component/Common/ResponsiveTable"
// import { getAcademicActivityLogTableColumns } from "~/FormMeta/Academic/AcademicActivityTableColumns"
// import { getActivityOrderSearchTableColumns } from "~/FormMeta/ActivityOrder/ActivityOrderSearchTableColumns"
// import { getEnrollmentActivityLogTableColumns } from "~/FormMeta/EnrollmentActivity/EnrollmentActivityTableColumns"
// import { getActivityOrderCreditSearchTableColumns } from "~/FormMeta/ActivityOrderCredit/ActivityOrderCreditSearchTableColumns"
// import { getPaymentActivityTableColumns } from "~/FormMeta/PaymentActivity/PaymentActivityTableColumns"
// import { UserCreateEditButton } from "~/FormMeta/User/UserFormMeta"

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
      summary: [summary]
    }
  })

  // tabMeta.push({
  //   tabTitle: "Logs",
  //   tabType: "summary",
  //   tabMeta: [],
  //   multipleTabMetas: [
  //     {
  //       tabTitle: "Academic",
  //       tabType: "table",
  //       tabMeta: {
  //         tableProps: {
  //           ...getAcademicActivityLogTableColumns(),
  //           searchParams: { UserID: user.UserID },
  //           refreshEventName: "REFRESH_REGISTRATION_ACADEMIC_ACTIVITY_PAGE"
  //         }
  //       }
  //     },
  //     {
  //       tabTitle: "Enrollment",
  //       tabType: "table",
  //       tabMeta: {
  //         tableProps: {
  //           ...getEnrollmentActivityLogTableColumns(),
  //           searchParams: { UserID: user.UserID },
  //           refreshEventName: "REFRESH_REGISTRATION_ENROLLMENT_ACTIVITY_PAGE"
  //         }
  //       }
  //     },
  //     {
  //       tabTitle: "Orders",
  //       tabType: "table",
  //       tabMeta: {
  //         tableProps: {
  //           pagination: false,
  //           ...getActivityOrderSearchTableColumns(),
  //           searchParams: { UserID: user.UserID },
  //           refreshEventName: "REFRESH_ORDER_ACTIVITY_PAGE"
  //         }
  //       }
  //     },
  //     {
  //       tabTitle: "Credits",
  //       tabType: "table",
  //       tabMeta: {
  //         tableProps: {
  //           ...getActivityOrderCreditSearchTableColumns(),
  //           searchParams: { UserID: user.UserID },
  //           refreshEventName: "REFRESH_REGISTRATION_ENROLLMENT_HISTORY_PAGE"
  //         }
  //       }
  //     },
  //     {
  //       tabTitle: "Payments",
  //       tabType: "table",
  //       tabMeta: {
  //         tableProps: {
  //           ...getPaymentActivityTableColumns(),
  //           searchParams: { UserID: user.UserID },
  //           refreshEventName: "REFRESH_PAYMENT_LOG"
  //         }
  //       }
  //     }
  //   ]
  // })

  return {
    // pageTitle: `${user.Name}`,
    tabs: tabMeta
  }
}
