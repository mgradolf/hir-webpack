import React from "react"
import { RouteComponentProps } from "react-router-dom"
import SectionCommentPage from "./CommentPage"

export default function (props: RouteComponentProps<{ sectionID: string }>) {
  const SectionID = Number(props.match.params.sectionID)
  return <SectionCommentPage sectionID={SectionID} />
}
