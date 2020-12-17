import React from "react"
import { RouteComponentProps } from "react-router-dom"
import SectionTagPage from "~/Pages/Section/TagPage"

export default function (props: RouteComponentProps<{ sectionID: string }>) {
  const sectionID = Number(props.match.params.sectionID)
  return <SectionTagPage sectionID={sectionID} />
}
