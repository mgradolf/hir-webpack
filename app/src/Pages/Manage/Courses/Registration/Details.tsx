import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { findRegistrationDetail } from "~/ApiServices/Service/RegistrationService"
import { searchQuestionResponse } from "~/ApiServices/Service/QuestionService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getRegistrationDetailsMeta } from "~/FormMeta/Registration/RegistrationDetailsMeta"
import { QUESTION_EVENT_TYPE_REGISTRATION } from "~/utils/Constants"

export default function RegistrationDetailsPage(props: RouteComponentProps<{ sectionID: string; studentID: string }>) {
  const SectionID = Number(props?.match?.params?.sectionID)
  const StudentID = Number(props?.match?.params?.studentID)
  const FirstParam: { [key: string]: any } = { SectionID, StudentID }
  const SecondParam: { [key: string]: any } = {
    SectionIDs: [SectionID],
    StudentIDs: [StudentID],
    EventID: QUESTION_EVENT_TYPE_REGISTRATION
  }

  const getRegistrationDetails = () => {
    return Promise.all([findRegistrationDetail(FirstParam), searchQuestionResponse(SecondParam)]).then((responses) => {
      const response1 = responses[0]
      const response2 = responses[1]
      if (response1.success && response2.success) {
        response1.data["QuestionResponses"] = response2.data
        return response1
      } else if (response2.success) {
        return response2
      } else {
        return response1
      }
    })
  }

  return <DetailsPage getMeta={getRegistrationDetailsMeta} getDetails={getRegistrationDetails} titleKey="StudentName" />
}
