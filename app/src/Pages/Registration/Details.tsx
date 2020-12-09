import React, { useState, useEffect } from "react"
import { Button, Tabs, Space, Spin } from "antd"
import Notification from "~/utils/notification"
import { RouteComponentProps } from "react-router-dom"
import { findRegistrations } from "~/ApiServices/Service/RegistrationService"
import { sendRegistrationConfirmationEmail } from "~/ApiServices/Service/MailService"
import { RegistrationSummaryTab } from "./RegistrationSummaryTab"
import { REGISTRATION_EMAIL_CONFIRMATION_SUCCESS } from "~/utils/Constants"
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

  const sendEmailConfirmation = async () => {
    if (registrationDetails) {
      setApiCallInProgress(true)
      const response = await sendRegistrationConfirmationEmail({
        StudentID: StudentID,
        SeatGroupID: registrationDetails.SeatGroupID
      })
      if (response.success) {
        Notification(REGISTRATION_EMAIL_CONFIRMATION_SUCCESS)
        console.log("Successfully send email!")
      }
      setApiCallInProgress(false)
    }
  }

  return (
    <>
      {apiCallInProgress && (
        <Space size="large" style={{ display: "block", textAlign: "center" }}>
          <Spin size="large" />
        </Space>
      )}
      {registrationDetails && Object.keys(registrationDetails).length > 0 && (
        <div className="site-layout-content">
          <Tabs
            defaultActiveKey="1"
            type="card"
            size="large"
            tabBarExtraContent={
              <Button type="primary" onClick={sendEmailConfirmation}>
                Email Confirmation
              </Button>
            }
          >
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
