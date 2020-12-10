import React from "react"
import { StandardDetailsPage } from "~/Component/Common/Page/DetailsPage/StandardDetailsPage"
import { getRegistrationDetailsMeta } from "~/FormMeta/Registration/RegistrationDetailsMeta"

interface IRegistrationSummaryTabProp {
  dataLoaded: { [key: string]: any }
}

export function RegistrationSummaryTab(props: IRegistrationSummaryTabProp) {
  return <StandardDetailsPage getDetailsMeta={getRegistrationDetailsMeta} dataLoaded={props.dataLoaded} />
}
