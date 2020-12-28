import React from "react"
import { RouteComponentProps } from "react-router-dom"
import SectionNoShowPage from "~/Pages/Section/NoShowPage"
export default function NoShow(props: RouteComponentProps<{ sectionID: string }>) {
  const SectionID = Number(props.match.params.sectionID)
  return <SectionNoShowPage SectionID={SectionID} />
}
