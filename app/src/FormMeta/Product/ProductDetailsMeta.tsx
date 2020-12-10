import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import { renderBoolean } from "~/Component/Common/ResponsiveTable"
import { getProductFinancialsTableColumns } from "~/FormMeta/ProductFinancialsTableColumns/ProductFinancialsTableColumns"

export const getProductDetailsMeta = (Product: { [key: string]: any }): IDetailsMeta[] => {
  const summary: CardContainer = {
    title: Product.ProductName,
    contents: [
      { label: "Product Category", value: Product.ProductCategoryName },
      { label: "Is Active", value: Product.ProductIsActive, render: renderBoolean },
      { label: "Optional Item", value: Product.OptionalItem, render: renderBoolean },
      { label: "Inventory", value: Product.ProductInventoryUnits },
      { label: "Gateway", value: Product.PaymentGatewayAccountName }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [summary]
  }

  const productFinancialMeta: IDetailsTableTabProp = {
    title: "Contacts",
    tableProps: {
      ...getProductFinancialsTableColumns(),
      searchParams: { ProductID: Product.ProductID }
    }
  }
  return [
    {
      title: "Summary",
      type: "summary",
      meta: summaryMeta
    },
    {
      title: "Financials",
      type: "table",
      meta: productFinancialMeta
    }
  ]
}
