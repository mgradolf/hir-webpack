import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { searchEnrollment, trackingProgress } from "~/ApiServices/BizApi/program/programEnrollmentIF"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getProgramEnrollmentDetailsMeta } from "~/TableSearchMeta/ProgramEnrollment/ProgramEnrollmentDetailsMeta"

export default function (props: RouteComponentProps<{ programID?: string; studentID?: string }>) {
  const ProgramID = Number(props?.match?.params?.programID)
  const StudentID = Number(props?.match?.params?.studentID)

  return (
    <DetailsPage
      getMeta={getProgramEnrollmentDetailsMeta}
      getDetails={() => {
        let result: IApiResponse
        return Promise.all([searchEnrollment({ programID: ProgramID, studentID: StudentID })])
          .then((responses) => {
            result = responses[0]
            if (result.success) {
              result.data = {
                ...result.data[0]
              }
            }
            return trackingProgress({ ProgramID: result.data.ProgramID, StudentID: result.data.StudentID })
          })
          .then((enrollmentDetails) => {
            if (enrollmentDetails.success) {
              const requirementList: Array<any> = []
              const requirements = enrollmentDetails.data.ProgramRequirementGroups
              // eslint-disable-next-line
              requirements.map((requirement: any) => {
                const offerings = requirement.Offerings
                // eslint-disable-next-line
                offerings.map((offering: any) => {
                  offering["RequirementGroupName"] = requirement.Name
                  requirementList.push(offering)
                })
              })
              result.data = {
                ...result.data,
                Offerings: requirementList,
                Summary: requirements
              }
            }
            return result
          })
      }}
    />
  )
}
