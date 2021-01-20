import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getBuildingDetailsMeta } from "~/FormMeta/Building/BuildingTypeDetailsMeta"
import { getBuildingTypeTableColumns } from "~/FormMeta/Building/BuildingTypeTableColumns"

export default function BuildingDetailsPage(props: RouteComponentProps<{ BuildingID: string }>) {
  const BuildingID = Number(props?.match?.params?.BuildingID)
  return (
    <DetailsPage
      getMeta={getBuildingDetailsMeta}
      getDetails={() =>
        getBuildingTypeTableColumns()
          .searchFunc({ BuildingID })
          .then((x) => {
            if (x.success) x.data = x.data[0]
            return x
          })
      }
      // entityType="Account"
      // entityID={BuildingID}
    />
  )
}
