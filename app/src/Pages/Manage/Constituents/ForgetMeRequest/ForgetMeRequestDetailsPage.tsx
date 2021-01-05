import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { getAnonymizeRequests } from "~/ApiServices/Service/AnonymizationRequestService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getForgetMeRequestDetailsMeta } from "~/FormMeta/ForgetMeRequest/ForgetMeRequestDetailsMeta"

export const ForgetMeRequestDetailsPage = (props: RouteComponentProps<{ AnonymizationRequestID: string }>) => {
  const AnonymizationRequestID = Number(props?.match?.params?.AnonymizationRequestID)
  return (
    <DetailsPage
      getMeta={getForgetMeRequestDetailsMeta}
      getDetails={() =>
        getAnonymizeRequests({ AnonymizationRequestID }).then((x) => {
          if (x.success) x.data = x.data[0]
          return x
        })
      }
    />
  )
}
