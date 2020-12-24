import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { getPersonDetails } from "~/ApiServices/Service/PersonService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getPersonDetailsMeta } from "~/FormMeta/Person/PersonDetailsMeta/PersonDetailsMeta"

export default function PersonDetailsPage(
  props: RouteComponentProps<{ personID?: string; facultyID?: string; studentID?: string }>
) {
  const PersonID = Number(props?.match?.params?.personID)
  const FacultyID = Number(props?.match?.params?.facultyID)
  const StudentID = Number(props?.match?.params?.studentID)

  let entityType: string
  let entityID: number
  let Param: { [key: string]: any }
  if (StudentID) {
    Param = { StudentID: StudentID }
    entityType = "Student"
    entityID = StudentID
  } else if (FacultyID) {
    Param = { FacultyID: FacultyID }
    entityType = "Faculty"
    entityID = FacultyID
  } else {
    Param = { PersonID: PersonID }
    entityType = "Person"
    entityID = PersonID
  }

  console.log(Param, PersonID, FacultyID, StudentID, entityType, entityID)
  return (
    <DetailsPage
      getMeta={getPersonDetailsMeta}
      getDetails={() => getPersonDetails(Param)}
      entityType={entityType}
      entityID={entityID}
    />
  )
}
