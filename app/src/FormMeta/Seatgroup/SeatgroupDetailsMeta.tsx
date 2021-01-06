import React from "react"
import { Link } from "react-router-dom"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import { renderBoolean } from "~/Component/Common/ResponsiveTable"
import SeatGroupEditLink from "~/Component/Section/SeatGroup/SeatGroupEditLink"
import SeatGroupRelatedAccountAddButton from "~/Component/Section/SeatGroup/SeatGroupRelatedAccountAddButton"
import SeatGroupRemoveLink from "~/Component/Section/SeatGroup/SeatGroupRemoveLink"
import { getSeatgroupFinancialTableColumns } from "~/FormMeta/SeatgroupFinancial/FinancialTableColumns"
import { REFRESH_SEATGROUP_FINANCIAL_PAGE, REFRESH_SEATGROUP_RELATED_ACCOUNT_PAGE } from "~/utils/EventBus"
import { getSeatgroupRelatedAccountTableColumns } from "~/FormMeta/SeatgroupRelatedAccount/RelatedAccountTableColumns"
import SeatGroupProgramButton from "~/Component/Section/SeatGroup/SeatGroupProgramButton"

export const getSeatgroupDetailsMeta = (seatgroup: { [key: string]: any }): IDetailsMeta => {
  const seatgroupInfo: CardContainer = {
    cardActions: [
      <SeatGroupEditLink additionalData={seatgroup} GhostType={true} style={{ marginRight: "5px" }} />,
      <SeatGroupRemoveLink PrimaryType={true} seatgroupId={seatgroup.SeatGroupID} />
    ],
    title: "Basic Info",
    contents: [
      {
        label: "Section Number",
        value: <Link to={`/section/${seatgroup.SectionID}`}>{seatgroup.SectionNumber}</Link>
      },
      {
        label: "Offering Name",
        value: <Link to={`/offering/${seatgroup.OfferingID}`}>{seatgroup.OfferingName}</Link>
      },
      { label: "Retail", value: seatgroup.IsDefault, render: renderBoolean },
      { label: "Allocated", value: seatgroup.NumberofSeats, render: undefined },
      { label: "Reserved", value: seatgroup.ReservedSeats, render: undefined },
      { label: "Available", value: seatgroup.AvailableSeats, render: undefined },
      { label: "Estimated", value: seatgroup.EstimatedEnrollment, render: undefined },
      { label: "Price", value: seatgroup.Price, render: undefined },
      { label: "Waitlist Enabled", value: seatgroup.WaitlistEnabled, render: undefined },
      { label: "Due Date Policy", value: seatgroup.DueDatePolicy, render: undefined },
      { label: "Package Name", value: seatgroup.PackageName, render: undefined },
      { label: "Opportunity", value: seatgroup.Opportunity, render: undefined },
      {
        label: "Program Name",
        value: (
          <SeatGroupProgramButton
            SeatGroupID={seatgroup.SeatGroupID}
            ProgramID={seatgroup.ProgramID}
            ProgramName={seatgroup.ProgramName}
          />
        )
      }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [seatgroupInfo]
  }

  const financialMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getSeatgroupFinancialTableColumns(seatgroup.SeatGroupID, seatgroup.SectionID),
      searchParams: { SectionID: seatgroup.SectionID, SeatGroupID: seatgroup.SeatGroupID },
      refreshEventName: REFRESH_SEATGROUP_FINANCIAL_PAGE
    }
  }

  const relatedAccountMeta: IDetailsTableTabProp = {
    blocks: [<SeatGroupRelatedAccountAddButton SeatGroupID={seatgroup.SeatGroupID} />],
    tableProps: {
      ...getSeatgroupRelatedAccountTableColumns(seatgroup.SeatGroupID),
      searchParams: { SeatGroupID: seatgroup.SeatGroupID },
      refreshEventName: REFRESH_SEATGROUP_RELATED_ACCOUNT_PAGE
    }
  }

  return {
    pageTitle: `${seatgroup.Name}`,
    tabs: [
      {
        tabTitle: "Summary",
        tabType: "summary",
        tabMeta: summaryMeta
      },
      {
        tabTitle: "Financials",
        tabType: "table",
        tabMeta: financialMeta
      },
      {
        tabTitle: "Related Accounts",
        tabType: "table",
        tabMeta: relatedAccountMeta
      }
    ]
  }
}
