import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import { renderBoolean } from "~/Component/Common/ResponsiveTable"
import { FINANCIAL_RESOURCE_TYPE_ID } from "~/utils/Constants"
import { getFinancialTableColumns } from "~/FormMeta/Financial/FinancialTableColumns"

export const getResourceDetailsMeta = (Resource: { [key: string]: any }): IDetailsMeta => {
  const summary: CardContainer = {
    title: Resource.Name,
    contents: [
      { label: "Resource Type", value: Resource.ResourceType },
      { label: "Is Active", value: Resource.IsActive, render: renderBoolean }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [summary]
  }

  const resourceFinancialMeta: IDetailsTableTabProp = {
    tableProps: {
      pagination: false,
      ...getFinancialTableColumns(Resource.ResourceID, FINANCIAL_RESOURCE_TYPE_ID),
      searchParams: { ResourceID: Resource.ResourceID }
    }
  }

  return {
    pageTitle: `Resource - ${Resource.Name}`,
    tabs: [
      {
        tabTitle: "Summary",
        tabType: "summary",
        tabMeta: summaryMeta
      },
      {
        tabTitle: "Financials",
        tabType: "table",
        tabMeta: resourceFinancialMeta
      }
    ]
  }
}
