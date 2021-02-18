import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getCatalogDetailsMeta } from "~/TableSearchMeta/Catalog/CatalogDetailsMeta"
import { getCatalogTableColumns } from "~/TableSearchMeta/Catalog/CatalogTableColumns"

export default (props: RouteComponentProps<{ catalogID?: string }>) => {
  const CatalogID = Number(props?.match?.params?.catalogID)
  return (
    <DetailsPage
      getMeta={getCatalogDetailsMeta}
      getDetails={() =>
        getCatalogTableColumns()
          .searchFunc({ CatalogID })
          .then((x) => {
            if (x.success) x.data = x.data[0]
            return x
          })
      }
      entityType="Catalog"
      entityID={CatalogID}
    />
  )
}
