import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { searchEnrollment, trackingProgress } from "~/ApiServices/BizApi/program/programEnrollmentIF"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getProgramEnrollmentDetailsMeta } from "~/FormMeta/ProgramEnrollment/ProgramEnrollmentDetailsMeta"

export function ProgramEnrollmentDetailsPage(props: RouteComponentProps<{ programEnrollmentID?: string }>) {
  const programEnrollmentID = Number(props?.match?.params?.programEnrollmentID)
  return (
    <DetailsPage
      getMeta={getProgramEnrollmentDetailsMeta}
      getDetails={() => {
        let result: IApiResponse
        return Promise.all([searchEnrollment({ enrollmentID: programEnrollmentID })])
          .then((responses) => {
            result = responses[0]
            if (result.success) {
              result.data = {
                ...result.data[0]
              }
            }
            return trackingProgress([result.data.ProgramID, result.data.StudentID])
          })
          .then((enrollmentDetails) => {
            if (enrollmentDetails.success) {
              const requirementList: Array<any> = []
              const requirements = enrollmentDetails.data.ProgramRequirementGroups
              // eslint-disable-next-line
              requirements.map((requirement: any) => {
                requirementList.push(...requirement.Offerings)
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
