import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { getEntityById } from "~/ApiServices/Service/EntityService"
import { searchOffering } from "~/ApiServices/Service/OfferingService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import OfferingMenu from "~/Component/Offering/OfferingMenu"
import { getOfferingDetailsMeta } from "~/FormMeta/Offering/OfferingDetailsMeta/OfferingDetailsMeta"

export default function OfferingDetailsPage(props: RouteComponentProps<{ offeringID?: string }>) {
  const OfferingID = Number(props?.match?.params?.offeringID)
  const Param: { [key: string]: any } = { OfferingID }

  const getOfferingDetails = () => {
    return Promise.all([searchOffering(Param), getEntityById("Offering", OfferingID)]).then((responses) => {
      const response1 = responses[0]
      const response2 = responses[1]
      if (response1.success && response2.success) {
        response2.data = {
          ...response2.data,
          ...response1.data[0]
        }
        return response2
      } else if (response2.success) {
        return response2
      } else {
        response1.data = response1.data[0]
        return response1
      }
    })
  }

  return (
    <DetailsPage
      getMeta={getOfferingDetailsMeta}
      getDetails={getOfferingDetails}
      entityType="Offering"
      entityID={OfferingID}
      actions={[<OfferingMenu offering={{ OfferingID }} />]}
    />
  )
}
