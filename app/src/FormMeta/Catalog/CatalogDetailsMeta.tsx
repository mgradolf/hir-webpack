import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import { renderBoolean, renderDate } from "~/Component/Common/ResponsiveTable"
import { getCatalogContentTableColumns } from "~/FormMeta/CatalogContent/getCatalogContentTableColumns"

export const getCatalogDetailsMeta = (Catalog: { [key: string]: any }): IDetailsMeta[] => {
  const summary: CardContainer = {
    title: Catalog.Name,
    contents: [
      { label: "Name", value: Catalog.Name },
      { label: "Active", value: Catalog.IsActive, render: renderBoolean },
      { label: "Type", value: Catalog.CatalogTypeName },
      { label: "Start Date", value: Catalog.StartDate, render: renderDate },
      { label: "End Date", value: Catalog.EndDate, render: renderDate },
      { label: "Image", value: Catalog.CatalogImage },
      { label: "Description", value: Catalog.Description },
      { label: "Sort Type", value: Catalog.SortTypeName },
      { label: "Account", value: Catalog.AccountID }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [summary]
  }

  const catalogContentMeta: IDetailsTableTabProp = {
    title: "",
    tableProps: {
      ...getCatalogContentTableColumns(),
      searchParams: { CatalogID: Catalog.CatalogID }
    }
  }
  return [
    {
      title: "Summary",
      type: "summary",
      meta: summaryMeta
    },
    {
      title: "Content",
      type: "table",
      meta: catalogContentMeta
    }
  ]
}
