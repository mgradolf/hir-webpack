import React from "react"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderBoolean, renderDate } from "~/Component/Common/ResponsiveTable"
import { getCatalogContentTableColumns } from "~/FormMeta/CatalogContent/getCatalogContentTableColumns"
import { CatalogContentAddDropdown } from "~/FormMeta/CatalogContent/CatalogContentAddDropdown"
import {
  CatalogOfferingSortingTableComponent,
  CatalogProgramSortingTableComponent,
  CatalogSectionSortingTableComponent
} from "~/FormMeta/Catalog/CatalogSortingTableComponent"

export const getCatalogDetailsMeta = (Catalog: { [key: string]: any }): IDetailsMeta => {
  const tabMeta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      { label: "Name", value: Catalog.Name },
      { label: "Description", value: Catalog.Description },
      { label: "Start Date", value: Catalog.StartDate, render: renderDate },
      { label: "End Date", value: Catalog.EndDate, render: renderDate },
      { label: "Type", value: Catalog.CatalogTypeName },
      { label: "Sort Type", value: Catalog.SortTypeName },
      { label: "Image", value: Catalog.CatalogImage },
      { label: "Account", value: Catalog.AccountID },
      { label: "Active", value: Catalog.IsActive, render: renderBoolean }
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
      blocks: [<CatalogContentAddDropdown CatalogID={Catalog.CatalogID} eventName="REFRESH_CATALOG_CONTENT_TABLE" />],
      tableProps: {
        ...getCatalogContentTableColumns(),
        searchParams: { CatalogID: Catalog.CatalogID },
        refreshEventName: "REFRESH_CATALOG_CONTENT_TABLE"
      }
    }
  })

  if (Catalog.SortType === 2) {
    tabMeta.push({
      tabTitle: "Sorting Preview",
      tabType: "table",
      tabMeta: undefined,
      multipleTabMetas: [
        {
          tabTitle: "Offering",
          tabType: "custom",
          tabMeta: {
            component: CatalogOfferingSortingTableComponent,
            props: { CatalogID: Catalog.CatalogID }
          }
        },
        {
          tabTitle: "Section",
          tabType: "custom",
          tabMeta: {
            component: CatalogSectionSortingTableComponent,
            props: { CatalogID: Catalog.CatalogID }
          }
        },
        {
          tabTitle: "Program",
          tabType: "custom",
          tabMeta: {
            component: CatalogProgramSortingTableComponent,
            props: { CatalogID: Catalog.CatalogID }
          }
        }
      ]
    })
  }

  return {
    pageTitle: `Catalog - ${Catalog.Name}`,
    tabs: tabMeta
  }
}
