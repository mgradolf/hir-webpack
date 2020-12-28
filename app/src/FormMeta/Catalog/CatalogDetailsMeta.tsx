import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderBoolean, renderDate } from "~/Component/Common/ResponsiveTable"
import { getCatalogContentTableColumns } from "~/FormMeta/CatalogContent/getCatalogContentTableColumns"

export const getCatalogDetailsMeta = (Catalog: { [key: string]: any }): IDetailsMeta => {
  const tabMeta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
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

  tabMeta.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      summary: [summary]
    }
  })

  tabMeta.push({
    tabTitle: "Content",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getCatalogContentTableColumns(),
        searchParams: { CatalogID: Catalog.CatalogID }
      }
    }
  })

  return {
    pageTitle: `Catalog - ${Catalog.Name}`,
    tabs: tabMeta
  }
}
