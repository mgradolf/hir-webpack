import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import { renderBoolean, renderDate } from "~/Component/Common/ResponsiveTable"
import { FINANCIAL_MARKETING_PROGRAM_TYPE_ID } from "~/utils/Constants"
import { getFinancialTableColumns } from "~/FormMeta/Financial/FinancialTableColumns"

export const getMarketingProgramDetailsMeta = (MarketingProgram: { [key: string]: any }): IDetailsMeta => {
  const summary: CardContainer = {
    title: MarketingProgram.MarketSource,
    contents: [
      { label: "Start Date", value: MarketingProgram.StartDate, render: renderDate },
      { label: "End Date", value: MarketingProgram.EndDate, render: renderDate },
      { label: "Is Active", value: MarketingProgram.IsActive, render: renderBoolean }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [summary]
  }

  const financialMeta: IDetailsTableTabProp = {
    tableProps: {
      pagination: false,
      ...getFinancialTableColumns(MarketingProgram.MarketingProgramID, FINANCIAL_MARKETING_PROGRAM_TYPE_ID),
      searchParams: { MarketingProgramID: MarketingProgram.MarketingProgramID }
    }
  }

  return {
    pageTitle: `Marketing Programs - ${MarketingProgram.MarketSource}`,
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
      }
    ]
  }
}
