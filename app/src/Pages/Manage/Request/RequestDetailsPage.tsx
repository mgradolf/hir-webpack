import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { readRequestForStaff } from "~/ApiServices/Service/RequestService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getRequestDetailsMeta } from "~/FormMeta/Request/RequestDetailsMeta"

export interface IParamsToBeDispatched {
  ValueUpdate: boolean
  Params: { [key: string]: string }
}

export default function RequestDetailsPage(props: RouteComponentProps<{ requestID: string }>) {
  const requestID = props.match.params.requestID
  const Param: { [key: string]: any } = { RequestID: requestID, Standalone: true }

  const getRequestDetails = () => {
    return Promise.all([readRequestForStaff(Param)]).then((responses) => {
      const response = responses[0]
      if (response.success) {
        return response
      }
      return response
    })
  }

  return (
    <DetailsPage
      getMeta={getRequestDetailsMeta}
      getDetails={getRequestDetails}
    />
  )
}