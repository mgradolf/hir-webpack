import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import { renderDate } from "~/Component/Common/ResponsiveTable"
import { getMarketingCodeResponseTableColumns } from "~/FormMeta/MarketingCodeResponse/MarketingCodeResponseTableColumns"

export const getMarketingCodeRepositoryDetailsMeta = (MarketingCode: { [key: string]: any }): IDetailsMeta[] => {
  const summary: CardContainer = {
    title: MarketingCode.Name,
    contents: [
      { label: "Description", value: MarketingCode.Description, render: undefined },
      { label: "Category", value: MarketingCode.CategoryName, render: undefined },
      { label: "Start Date", value: MarketingCode.StartDate, render: renderDate },
      { label: "End Date", value: MarketingCode.EndDate, render: renderDate }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [summary]
  }

  const responsesMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getMarketingCodeResponseTableColumns(),
      searchParams: { MarketingCodeID: MarketingCode.MarketingCodeID }
    }
  }
  return [
    {
      title: "Summary",
      type: "summary",
      meta: summaryMeta
    },
    {
      title: "Responses",
      type: "table",
      meta: responsesMeta
    }
  ]
}
