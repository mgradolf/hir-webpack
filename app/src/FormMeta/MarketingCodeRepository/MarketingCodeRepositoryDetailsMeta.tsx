import { CardContainer } from "~/Component/Common/Page/DetailsPage/StandardDetailsPage"
import { renderDate } from "~/Component/Common/ResponsiveTable"

export const getMarketingCodeRepositoryDetailsMeta = (MarketingCode: { [key: string]: any }): CardContainer[] => {
  const MarketingCodeInfo: CardContainer = {
    title: MarketingCode.Name,
    contents: [
      { label: "Description", value: MarketingCode.Description, render: undefined },
      { label: "Category", value: MarketingCode.CategoryName, render: undefined },
      { label: "Start Date", value: MarketingCode.StartDate, render: renderDate },
      { label: "End Date", value: MarketingCode.EndDate, render: renderDate }
    ]
  }

  return [MarketingCodeInfo]
}
