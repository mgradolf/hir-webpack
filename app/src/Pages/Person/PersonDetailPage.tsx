import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { getPersonDetails } from "~/ApiServices/Service/PersonService"
import { StandardDetailsPage } from "~/Component/Common/Page/DetailsPage/StandardDetailsPage"
import { getPersonDetailsMeta } from "~/FormMeta/Person/PersonDetailsMeta"

export default function PersonDetailsPage(
  props: RouteComponentProps<{ personID?: string; facultyID?: string; studentID?: string }>
) {
  const PersonID = Number(props?.match?.params?.personID)
  const FacultyID = Number(props?.match?.params?.facultyID)
  const StudentID = Number(props?.match?.params?.studentID)

  let Param: { [key: string]: any }
  if (StudentID) Param = { StudentID: StudentID }
  else if (FacultyID) Param = { FacultyID: FacultyID }
  else Param = { PersonID: PersonID }

  return <StandardDetailsPage getDetailsMeta={getPersonDetailsMeta} getDetailsFunc={() => getPersonDetails(Param)} />
}
