import React from "react"
import { RouteComponentProps } from "react-router-dom"
import CommentCreateModalOpenButton from "~/Component/Section/Comment/CommentCreateModalOpenButton"

export default function index(props: RouteComponentProps<{ sectionID: string }>) {
  const sectionID = Number(props.match.params.sectionID)
  return <CommentCreateModalOpenButton SectionID={sectionID} />
}
