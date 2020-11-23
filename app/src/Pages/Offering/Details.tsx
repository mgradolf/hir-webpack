import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { getEntityById } from "~/ApiServices/Service/EntityService"
import { searchOffering } from "~/ApiServices/Service/OfferingService"
import { StandardDetailsPage } from "~/Component/Common/Page/DetailsPage/StandardDetailsPage"
import { getOfferingDetailsMeta } from "~/FormMeta/Offering/OfferingDetailsMeta"

export default function PersonDetailsPage(props: RouteComponentProps<{ offeringID?: string }>) {
  const OfferingID = Number(props?.match?.params?.offeringID)

  const Param: { [key: string]: any } = { OfferingID }

  return (
    <StandardDetailsPage
      getDetailsMeta={getOfferingDetailsMeta}
      getDetailsFunc={() => {
        return Promise.all([searchOffering(Param), getEntityById("Offering", OfferingID)]).then((responses) => {
          const response1 = responses[0]
          const response2 = responses[1]
          if (response1.success && response2.success) {
            response2.data = {
              ...response2.data,
              ...response1.data[0]
            }
            console.log(response2)
            return response2
          } else if (response2.success) return response2
          else return response1
        })
      }}
    />
  )
}
