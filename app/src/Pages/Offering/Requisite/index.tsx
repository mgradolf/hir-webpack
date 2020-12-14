import React from "react"
import { RouteComponentProps } from "react-router"
import RequisitePage from "./RequisitePage"

export default function OfferingRequisitePage(props: RouteComponentProps<{ offeringID: string }>) {
  const offeringID = Number(props.match.params.offeringID)

  return <RequisitePage offeringID={offeringID} title={"Manage Offering Prerequisite"} />
}
