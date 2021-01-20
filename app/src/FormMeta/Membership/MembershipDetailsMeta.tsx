import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { renderBoolean, renderDate, renderLink } from "~/Component/Common/ResponsiveTable"
import { getMembershipBeneficiariesTableColumns } from "~/FormMeta/Membership/MembershipBeneficiariesTableColumns"
import { getMembershipTermsTableColumns } from "~/FormMeta/Membership/MembershipTermsTableColumns"

export const getMembershipDetailsMeta = (record: { [key: string]: any }): IDetailsMeta => {
  const summary: CardContainer = {
    title: "Summary",
    contents: [
      {
        label: "Member",
        value: record.PersonName,
        render: (text: any) => renderLink(`/person/${record.PersonID}`, text)
      },
      {
        label: "Membership Program",
        value: record.MembershipProgramName,
        render: (text: any) => renderLink(`/membershipprogram/${record.MembershipProgramID}`, text)
      },
      { label: "Level", value: record.MembershipDefinitionName },
      { label: "Member Since", value: record.MemberSince, render: renderDate },
      { label: "Expiration Date", value: record.MktExpirationDate, render: renderDate },
      { label: "Renewal Period Starts", value: record.MktRenewalBeginDate, render: renderDate },
      { label: "Renewal Period Ends", value: record.RenewalTermExpirationDate, render: renderDate },
      { label: "Active", value: record.IsActive, render: renderBoolean }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [summary]
  }

  return {
    pageTitle: "Membership Details",
    tabs: [
      {
        tabTitle: "Summary",
        tabType: "summary",
        tabMeta: summaryMeta
      },
      {
        tabTitle: "Membership Beneficiaries",
        tabType: "table",
        tabMeta: {
          tableProps: {
            ...getMembershipBeneficiariesTableColumns(),
            searchParams: { MembershipTermID: record.MembershipTermID, PersonID: record.PersonID },
            refreshEventName: "REFRESH_MEMBERSHIP_BENIFICIARIES_TAB"
          }
        }
      },
      {
        tabTitle: "Membership Terms",
        tabType: "table",
        tabMeta: {
          tableProps: {
            ...getMembershipTermsTableColumns(),
            searchParams: { MembershipID: record.MembershipID },
            refreshEventName: "REFRESH_MEMEBERSHIP_TERMS_TAB"
          }
        }
      }
    ]
  }
}
