import React, { useState, useEffect } from "react"
import { Tabs, Space, Spin, Row, Typography } from "antd"
import { RouteComponentProps } from "react-router-dom"
import { findRegistrations } from "~/ApiServices/Service/RegistrationService"
import { RegistrationSummaryTab } from "~/Pages/Registration/RegistrationSummaryTab"
import RegistrationUpdateForm from "~/Component/Registration/RegistrationUpdateForm"
import RegistrationActionForm from "~/Component/Registration/RegistrationActionForm"
import RegistrationQuestionsForm from "~/Component/Registration/RegistrationQuestionsForm"
import RegistrationGradeForm from "~/Component/Registration/RegistrationGradeForm"
import IssueCertificateForm from "~/Component/Registration/IssueCertificateForm"

export default function RegistrationDetailsPage(
  props: RouteComponentProps<{ sectionID?: string; studentID?: string }>
) {
  const SectionID = Number(props?.match?.params?.sectionID)
  const StudentID = Number(props?.match?.params?.studentID)
  const Param: { [key: string]: any } = { SectionID, StudentID }

  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [registrationDetails, setRegistrationDetails] = useState<{ [key: string]: any }>({})

  useEffect(() => {
    ;(async function () {
      setApiCallInProgress(true)
      const result = await findRegistrations(Param)
      if (result && result.success) {
        setRegistrationDetails(result.data[0])
      }
      setApiCallInProgress(false)
    })()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {apiCallInProgress && (
        <Space size="large" style={{ display: "block", textAlign: "center" }}>
          <Spin size="large" />
        </Space>
      )}
      {registrationDetails && Object.keys(registrationDetails).length > 0 && (
        <div className="site-layout-content">
          <Row>
            <Typography.Title level={3}>
              {registrationDetails.OfferingName} - {registrationDetails.StudentName}
            </Typography.Title>
          </Row>
          <Tabs defaultActiveKey="1" type="card" size="large">
            <Tabs.TabPane tab="Summary" key="1">
              <RegistrationSummaryTab dataLoaded={registrationDetails} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Registration Details" key="2">
              <RegistrationUpdateForm initialFormValue={registrationDetails} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Drop/Withdraw/Delete" key="3">
              <RegistrationActionForm initialFormValue={registrationDetails} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Question Responses" key="4">
              <RegistrationQuestionsForm
                sectionID={registrationDetails.SectionID}
                studentID={registrationDetails.StudentID}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Final Grades" key="5">
              <RegistrationGradeForm initialFormValue={registrationDetails} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Certificates" key="6">
              <IssueCertificateForm initialFormValue={registrationDetails} />
            </Tabs.TabPane>
          </Tabs>
        </div>
      )}
    </>
  )
}
