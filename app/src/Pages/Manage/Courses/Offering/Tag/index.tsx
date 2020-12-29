import React from "react"
import { RouteComponentProps } from "react-router-dom"
import TagPage from "~/Pages/Manage/Courses/Offering/Tag/TagPage"

export default function (props: RouteComponentProps<{ offeringID: string }>) {
  const offeringID = Number(props.match.params.offeringID)
  return <TagPage offeringID={offeringID} />
}
