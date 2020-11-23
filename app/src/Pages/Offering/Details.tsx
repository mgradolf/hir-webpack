import React, { useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { getEntityById } from "~/ApiServices/Service/EntityService"
import { searchOffering } from "~/ApiServices/Service/OfferingService"
import { StandardDetailsPage } from "~/Component/Common/Page/DetailsPage/StandardDetailsPage"
import OfferingEditLink from "~/Component/Offering/CreateEdit/OfferingEditLink"
import OfferingMenu from "~/Component/Offering/OfferingMenu"
import { getOfferingDetailsMeta } from "~/FormMeta/Offering/OfferingDetailsMeta"

export default function OfferingDetailsPage(props: RouteComponentProps<{ offeringID?: string }>) {
  const OfferingID = Number(props?.match?.params?.offeringID)
  const [offeringDetails, setOfferingDetails] = useState<{ [key: string]: any }>({})
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
            setOfferingDetails(response2.data)
            return response2
          } else if (response2.success) {
            setOfferingDetails(response2.data)
            return response2
          } else {
            response1.data = response1.data[0]
            setOfferingDetails(response1.data)
            return response1
          }
        })
      }}
      actions={[
        <OfferingMenu offering={offeringDetails} />,
        <OfferingEditLink OfferingId={OfferingID} PrimaryType={true} />
      ]}
    />
  )
}
