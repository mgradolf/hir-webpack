import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { searchResourceItem } from "~/ApiServices/Service/FinancialService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getResourceDetailsMeta } from "~/FormMeta/Resource/ResourceDetailsMeta"

export default function ResourceDetailsPage(props: RouteComponentProps<{ resourceID: string }>) {
  const ResourceID = Number(props?.match?.params?.resourceID)

  return (
    <DetailsPage
      getMeta={getResourceDetailsMeta}
      getDetails={() =>
        searchResourceItem({ ResourceID }).then((x) => {
          if (x.success) x.data = x.data[0]
          return x
        })
      }
      entityType="Resource"
      entityID={ResourceID}
    />
  )
}
