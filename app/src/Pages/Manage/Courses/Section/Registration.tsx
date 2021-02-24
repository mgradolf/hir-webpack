import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import { getRegistrationTableColumns } from "~/TableSearchMeta/Registration/RegistrationTableColumns"

export default function RegistrationPage(props: RouteComponentProps<{ sectionID?: string }>) {
  const SectionID = Number(props.match.params.sectionID)
  return <ResponsiveTable {...getRegistrationTableColumns()} searchParams={{ SectionID }} />
}
