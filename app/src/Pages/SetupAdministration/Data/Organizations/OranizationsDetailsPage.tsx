import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getOrganizationDetailsMeta } from "~/FormMeta/Organization/OrganizationDetailsMeta"
import { getOrganizationTableColumns } from "~/FormMeta/Organization/OrganizationTableColumns"

export default function (props: RouteComponentProps<{ OrganizationID?: string }>) {
  const OrganizationID = Number(props?.match?.params?.OrganizationID)
  return (
    <DetailsPage
      getMeta={getOrganizationDetailsMeta}
      getDetails={() =>
        getOrganizationTableColumns()
          .searchFunc({ OrganizationID })
          .then((x) => {
            if (x.success) x.data = x.data[0]
            return x
          })
      }
      entityType="Organization"
      entityID={OrganizationID}
    />
  )
}
