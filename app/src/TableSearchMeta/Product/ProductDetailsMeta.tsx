import React from "react"
import { CardContainer, IDetailsSummary } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/Common"

import { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import { renderBoolean } from "~/Component/Common/ResponsiveTable"
import SectionAddButton from "~/Component/Feature/Section/SectionAddButton"
import { getProductFinancialsTableColumns } from "~/TableSearchMeta/ProductFinancialsTableColumns/ProductFinancialsTableColumns"
import { getSectionProductTableColumns } from "~/TableSearchMeta/SectionProduct/ProductTableColumns"
import { REFRESH_SECTION_PRODUCT_PAGE } from "~/utils/EventBus"

export const getProductDetailsMeta = (Product: { [key: string]: any }): IDetailsMeta => {
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
    title: "Financials",
    tableProps: {
      ...getProductFinancialsTableColumns(),
      searchParams: { ProductID: Product.ProductID }
    }
  }

  const relatedSectionMeta: IDetailsTableTabProp = {
    blocks: [<SectionAddButton ProductId={Product.ProductID} />],
    title: "Related Sections",
    tableProps: {
      pagination: false,
      ...getSectionProductTableColumns(),
      searchParams: { ProductID: Product.ProductID },
      refreshEventName: REFRESH_SECTION_PRODUCT_PAGE
    }
  }

  return {
    pageTitle: `Product - ${Product.ProductName}`,
    tabs: [
      {
        tabTitle: "Summary",
        tabType: "summary",
        tabMeta: summaryMeta
      },
      {
        tabTitle: "Related Sections",
        tabType: "table",
        tabMeta: relatedSectionMeta
      },
      {
        tabTitle: "Financials",
        tabType: "table",
        tabMeta: productFinancialMeta
      }
    ]
  }
}
