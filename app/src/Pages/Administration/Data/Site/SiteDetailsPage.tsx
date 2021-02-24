import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getSiteDetailsMeta } from "~/TableSearchMeta/Site/SiteDetailsMeta"
import { getSiteTableColumns } from "~/TableSearchMeta/Site/SiteTableColumns"

export default function SiteDetailsPage(props: RouteComponentProps<{ SiteID: string }>) {
  const SiteID = Number(props?.match?.params?.SiteID)
  return (
    <DetailsPage
      getMeta={getSiteDetailsMeta}
      getDetails={() =>
        getSiteTableColumns()
          .searchFunc({ SiteID })
          .then((x) => {
            if (x.success) x.data = x.data[0]
            return x
          })
      }
      // entityType="Account"
      // entityID={SiteID}
    />
  )
}
