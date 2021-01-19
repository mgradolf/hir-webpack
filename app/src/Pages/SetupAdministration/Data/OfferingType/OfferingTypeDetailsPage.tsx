import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getOfferingTypeDetailsMeta } from "~/FormMeta/OfferingType/OfferingTypeDetailsMeta"
import { getOfferingTypeTableColumns } from "~/FormMeta/OfferingType/OfferingTypeTableColumns"

export default function OfferingTypeDetailsPage(props: RouteComponentProps<{ OfferingTypeID: string }>) {
  const OfferingTypeID = Number(props?.match?.params?.OfferingTypeID)
  return (
    <DetailsPage
      getMeta={getOfferingTypeDetailsMeta}
      getDetails={() =>
        getOfferingTypeTableColumns()
          .searchFunc({ OfferingTypeID })
          .then((x) => {
            if (x.success) x.data = x.data[0]
            return x
          })
      }
      // entityType="Account"
      // entityID={OfferingTypeID}
    />
  )
}
