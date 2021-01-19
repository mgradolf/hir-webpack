import React from "react"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { IDetailsCustomTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsCustomTab"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { renderDate } from "~/Component/Common/ResponsiveTable"

export const getMembershipDetailsMeta = (record: { [key: string]: any }): IDetailsMeta => {
  const summary: CardContainer = {
    title: "Summary",
    contents: [
      { label: "Member", value: record.PersonName, 
        render: (text: any, record: any) => renderLink(`/person/${record.PersonID}`, text),
      },
      { label: "Membership Program", value: record.MembershipProgramName,
        render: (text: any, record: any) => renderLink(`/membershipprogram/${record.MembershipProgramID}`, text),      
      },
      { label: "Level", value: record.MembershipDefinitionName },
      { label: "Member Since", value: record.MemberSince, render: renderDate },
      { label: "Expiration Date", value: record.MktExpirationDate, render: renderDate },
      { label: "Renewal Period Starts", value: record.MktRenewalBeginDate, render: renderDate },
      { label: "Renewal Period Ends", value: record.RenewalTermExpirationDate, render: renderDate },      
      { label: "Active", value: record.IsActive, render:renderBoolean }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [summary]
  }

//TODO: add 2 tabs for beneficiaries table and membership terms table
  return {
    pageTitle: "Membership Details",
    tabs: [
      {
        tabTitle: "Summary",
        tabType: "summary",
        tabMeta: summaryMeta
      }
    ]
  }
}
