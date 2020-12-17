import React from "react"
import { RouteComponentProps } from "react-router"
import SectionSchedulePage from "~/Pages/Section/Schedule/SchedulePage"

export default function SchedulePage(props: RouteComponentProps<{ sectionID: string }>) {
  const SectionID = Number(props.match.params.sectionID)
  return <SectionSchedulePage sectionID={SectionID} title={"Manage Schedule"} />
}
