import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { renderBoolean, renderDate } from "~/Component/Common/ResponsiveTable"

export const getCatalogDetailsMeta = (Catalog: { [key: string]: any }): CardContainer[] => {
  const CatalogInfo: CardContainer = {
    title: Catalog.Name,
    contents: [
      { label: "Active", value: Catalog.IsActive, render: renderBoolean },
      { label: "Catalog Type", value: Catalog.CatalogTypeName },
      { label: "Start Date", value: Catalog.StartDate, render: renderDate },
      { label: "End Date", value: Catalog.EndDate, render: renderDate },
      { label: "Image", value: Catalog.CatalogImage },
      { label: "Description", value: Catalog.Description },
      { label: "Sort Type", value: Catalog.SortType },
      { label: "Account", value: Catalog.AccountID }
    ]
  }

  return [CatalogInfo]
}
