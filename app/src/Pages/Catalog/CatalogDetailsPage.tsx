import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { StandardDetailsPage } from "~/Component/Common/Page/DetailsPage/StandardDetailsPage"
import { getCatalogDetailsMeta } from "~/FormMeta/Catalog/CatalogDetailsMeta"
import { getCatalogTableColumns } from "~/FormMeta/Catalog/CatalogTableColumns"
export function CatalogDetailsPage(props: RouteComponentProps<{ catalogID?: string }>) {
  const CatalogID = Number(props?.match?.params?.catalogID)

  return (
    <StandardDetailsPage
      getDetailsMeta={getCatalogDetailsMeta}
      getDetailsFunc={() =>
        getCatalogTableColumns()
          .searchFunc({ CatalogID })
          .then((x) => {
            if (x.success) x.data = x.data[0]
            return x
          })
      }
    />
  )
}
