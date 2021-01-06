// import React from "react"
import React from "react"
import { Link } from "react-router-dom"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderBoolean, renderDate, renderEmail } from "~/Component/Common/ResponsiveTable"

export const getForgetMeRequestDetailsMeta = (request: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      {
        label: "First Name",
        value: request.FirstName,
        render: (text) => <Link to={`/person/${request.PersonID}`}>{text}</Link>
      },
      {
        label: "Last Name",
        value: request.LastName,
        render: (text) => <Link to={`/person/${request.PersonID}`}>{text}</Link>
      },
      { label: "Email Address", value: request.EmailAddress, render: renderEmail },
      { label: "Request Date", value: request.RequestDate, render: renderDate },
      { label: "Request Source", value: request.SourceName },
      { label: "Request By", value: request.StaffUserName },
      { label: "Processed", value: request.IsProcessed, render: renderBoolean },
      { label: "Processing Date", value: request.ProcessingDate, render: renderDate },
      { label: "Approved", value: request.IsApproved, render: renderBoolean },
      { label: "Approval Date", value: request.ApprovalDate, render: renderDate },
      { label: "Approved By", value: request.ApprovalUser },
      { label: "Cancelled", value: request.IsCancelled, render: renderBoolean },
      { label: "Cancelled Date", value: request.CancellationDate, render: renderDate },
      { label: "Cancelled By", value: request.CancellationStaffUserName }
    ]
  }

  meta.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      summary: [summary]
    }
  })
  return {
    pageTitle: `Forget Me Request ID - ${request.AnonymizationRequestID}`,
    tabs: meta
  }
}
