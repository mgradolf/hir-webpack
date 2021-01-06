import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { findBatches } from "~/ApiServices/Service/BatchService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getBatchDetailsMeta } from "~/FormMeta/Batch/BatchDetailsMeta"

export default function BatchDetailsPage(props: RouteComponentProps<{ BatchImportID: string }>) {
  const BatchImportID = Number(props?.match?.params?.BatchImportID)
  return (
    <DetailsPage
      getMeta={getBatchDetailsMeta}
      getDetails={() =>
        findBatches({ BatchImportID }).then((x) => {
          if (x.success) x.data = x.data[0]
          return x
        })
      }
      // entityType="Batch"
      // entityID={BatchImportID}
    />
  )
}
