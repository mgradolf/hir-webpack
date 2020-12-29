import React from "react"
import { RouteComponentProps } from "react-router-dom"
import SectionQuestionPage from "~/Pages/Manage/Courses/Section/QuestionPage"

export default function QuestionPage(props: RouteComponentProps<{ offeringID?: string; sectionID?: string }>) {
  const sectionID = Number(props.match.params.sectionID)
  return <SectionQuestionPage sectionID={sectionID} />
}
