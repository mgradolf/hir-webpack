import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { REFRESH_OFFERING_QUALIFIED_INSTRUCTOR_PAGE } from "~/utils/EventBus"
import { AddInstructorButton } from "~/Component/Offering/QualifiedInstructor/AddInstructorButton"
import { getQualifiedInstructorTableColumns } from "~/TableSearchMeta/Offering/QualifiedInstructorTableColumns"

export default function QualifiedInstructorPage(props: RouteComponentProps<{ offeringID?: string }>) {
  const OfferingID = Number(props.match.params.offeringID)

  return (
    <SearchPage
      blocks={[<AddInstructorButton OfferingID={OfferingID} />]}
      title="Manage Offering Instructors"
      tableProps={{
        ...getQualifiedInstructorTableColumns(),
        refreshEventName: REFRESH_OFFERING_QUALIFIED_INSTRUCTOR_PAGE
      }}
      initialFormValue={{ OfferingID: OfferingID }}
    />
  )
}
