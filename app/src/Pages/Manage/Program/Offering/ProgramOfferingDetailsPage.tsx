import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { getEntityById } from "~/ApiServices/Service/EntityService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getProgramOfferingDetailsMeta } from "~/TableSearchMeta/ProgramOffering/ProgramOfferingDetailsMeta"

export default function (props: RouteComponentProps<{ programOfferingID?: string }>) {
  const programOfferingID = Number(props?.match?.params?.programOfferingID)
  return (
    <DetailsPage
      getMeta={getProgramOfferingDetailsMeta}
      getDetails={() => getEntityById("Offering", programOfferingID)}
    />
  )
}
