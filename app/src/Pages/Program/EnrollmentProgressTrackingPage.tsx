import { Collapse, Row, Spin } from "antd"
import React, { useState, useEffect } from "react"
import { trackingProgress } from "~/ApiServices/BizApi/program/programEnrollmentIF"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getProgressTrackingDetailsMeta } from "~/FormMeta/ProgramEnrollment/ProgressTrackingDetailsMeta"
import { REFRESH_PROGRAM_ENROLLMENT_REQUIREMENT_GROUP_PAGE } from "~/utils/EventBus"

interface IRequisitePageProp {
  programID: number
  studentID: number
}

export default function EnrollmentProgressTrackingPage(props: IRequisitePageProp) {
  const [itemDetails, setItemDetails] = useState<{ [key: string]: any }>({})
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const response = await trackingProgress({ ProgramID: props.programID, StudentID: props.studentID })
      if (response && response.success) {
        setItemDetails(response.data)
      }
      setLoading(false)
    })()
  }, [props])

  const getProgressTrackingDetails = (ProgramReqGroupID: number) => {
    return Promise.all([trackingProgress({ ProgramID: props.programID, StudentID: props.studentID })]).then(
      (responses) => {
        const response = responses[0]
        if (response.success) {
          response.data.ProgramRequirementGroups.map((x: any) => {
            if (x.ProgramReqGroupID === ProgramReqGroupID) {
              response.data = {
                ...x
              }
              return response
            }
            return response
          })
        }
        return response
      }
    )
  }

  return (
    <>
      {loading && (
        <Row justify="center" align="middle">
          <Spin size="large" />
        </Row>
      )}
      {!loading && Object.keys(itemDetails).length > 0 && (
        <Collapse>
          {itemDetails.ProgramRequirementGroups.map((x: any, index: any) => (
            <Collapse.Panel header={x.Name} key={index + 1}>
              <DetailsPage
                refreshEventName={`${REFRESH_PROGRAM_ENROLLMENT_REQUIREMENT_GROUP_PAGE}_${index + 1}`}
                getMeta={getProgressTrackingDetailsMeta}
                getDetails={() => getProgressTrackingDetails(x.ProgramReqGroupID)}
              />
            </Collapse.Panel>
          ))}
        </Collapse>
      )}
    </>
  )
}
