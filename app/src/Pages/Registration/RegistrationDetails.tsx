import React, { useState, useEffect } from "react"
import { RouteComponentProps } from "react-router-dom"
import { Row, Col, Typography, Input, Space, Spin, Divider, Tabs, Button } from "antd"
import { findRegistrations } from "~/ApiServices/Service/RegistrationService"
import { sendRegistrationConfirmationEmail } from "~/ApiServices/Service/MailService"
import styles from "~/Pages/Request/RequestDetails.module.scss"
import RegistrationUpdateForm from "~/Component/Registration/RegistrationUpdateForm"
import RegistrationActionForm from "~/Component/Registration/RegistrationActionForm"
import RegistrationQuestionsForm from "~/Component/Registration/RegistrationQuestionsForm"
import RegistrationGradeForm from "~/Component/Registration/RegistrationGradeForm"
import {
  IRegistrationActionFieldNames,
  IRegistrationFieldNames,
  IRegistrationGradeFieldNames
} from "~/Component/Registration/Interfaces"

const { Title, Text } = Typography
const { TabPane } = Tabs

const fieldNames: IRegistrationFieldNames = {
  SectionID: "SectionID",
  StudentID: "StudentID",
  SeatGroupID: "SeatGroupID",
  IsRepeat: "IsRepeat",
  IsCompleteOnTermination: "IsCompleteOnTermination",
  StatusDate: "StatusDate",
  CreationTime: "CreationTime",
  TerminationTime: "TerminationTime",
  GradeScaleTypeID: "GradeScaleTypeID",
  TranscriptCreditTypeID: "TranscriptCreditTypeID",
  AttendanceExpected: "AttendanceExpected"
}

const actionFieldName: IRegistrationActionFieldNames = {
  SectionID: "SectionID",
  StudentID: "StudentID",
  SeatGroupID: "SeatGroupID",
  EffectiveDate: "EffectiveDate",
  IsRefund: "IsRefund",
  CreditMemoData: "CreditMemoData",
  GradeScaleTypeID: "GradeScaleTypeID",
  GradeScoreDefinitionID: "GradeScoreDefinitionID"
}

const gradeFieldName: IRegistrationGradeFieldNames = {
  SectionID: "SectionID",
  StudentID: "StudentID",
  SeatGroupID: "SeatGroupID",
  CompletionDate: "CompletionDate",
  CEUHours: "CEUHours",
  CreditHours: "CreditHours",
  GradeScaleTypeID: "GradeScaleTypeID",
  GradeScoreDefinitionID: "GradeScoreDefinitionID",
  AttendanceActual: "AttendanceActual",
  AttendanceExpected: "AttendanceExpected"
}

export interface IParamsToBeDispatched {
  ValueUpdate: boolean
  Params: { [key: string]: string }
}

function RegistrationDetailsPage(props: RouteComponentProps<{ sectionID?: string; studentID?: string }>) {
  const sectionID = props.match.params.sectionID
  const studentID = props.match.params.studentID

  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [registrationDetails, setRegistrationDetails] = useState<{ [key: string]: any }>()

  useEffect(() => {
    ; (async function () {
      setApiCallInProgress(true)
      const result = await findRegistrations({ SectionID: Number(sectionID), StudentID: Number(studentID) })
      if (result && result.success) {
        setRegistrationDetails(result.data[0])
      }
      setApiCallInProgress(false)
    })()
  }, [sectionID, studentID])

  return (
    <>
      {apiCallInProgress && (
        <Space size="large" style={{ display: "block", textAlign: "center" }}>
          <Spin size="large" />
        </Space>
      )}
      {registrationDetails && (
        <div className="site-layout-content">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ paddingBottom: "15px" }}>
            <Col className="gutter-row" xs={24} sm={24} md={12}>
              <Title level={3}>Registration Details</Title>
            </Col>
            <Col className={`gutter-row ${styles.textRight}`} xs={24} sm={24} md={12}>
              <Button type="primary"
                onClick={async () => {
                  setApiCallInProgress(true)
                  const response = await sendRegistrationConfirmationEmail({
                    StudentID: studentID,
                    SeatGroupID: registrationDetails.SeatGroupID
                  })
                  if (response.success) {
                    console.log("Successfully send email!")
                  }
                  setApiCallInProgress(false)
                }}>
                Email Confirmation
              </Button>
            </Col>
          </Row>
          <Divider orientation="left">Section</Divider>
          <Row className={styles.details}>
            <Col xs={8} sm={7} md={{ span: 2, offset: 2 }}>
              <Text>Offering Name:</Text>
            </Col>
            <Col xs={16} sm={17} md={6}>
              <Input type="text" disabled value={registrationDetails.OfferingName} />
            </Col>

            <Col xs={8} sm={7} md={{ span: 2, offset: 1 }}>
              <Text>Section Number:</Text>
            </Col>
            <Col xs={16} sm={17} md={6}>
              <Input type="text" disabled value={registrationDetails.SectionNumber} />
            </Col>
          </Row>

          <Row className={styles.details}>
            <Col xs={8} sm={7} md={{ span: 2, offset: 2 }}>
              <Text>Status:</Text>
            </Col>
            <Col xs={16} sm={17} md={6}>
              <Input type="text" disabled value={registrationDetails.TranscriptCreditType} />
            </Col>

            <Col xs={8} sm={7} md={{ span: 2, offset: 1 }}>
              <Text>Seat Group:</Text>
            </Col>
            <Col xs={16} sm={17} md={6}>
              <Input type="text" disabled value={registrationDetails.SeatGroup} />
            </Col>
          </Row>

          <Row className={styles.details}>
            <Col xs={8} sm={7} md={{ span: 2, offset: 2 }}>
              <Text>Grade Scale:</Text>
            </Col>
            <Col xs={16} sm={17} md={6}>
              <Input type="text" disabled value={registrationDetails.GradeScaleType} />
            </Col>

            <Col xs={8} sm={7} md={{ span: 2, offset: 1 }}>
              <Text>Final Grade:</Text>
            </Col>
            <Col xs={16} sm={17} md={6}>
              <Input type="text" disabled value={registrationDetails.AlphaValue} />
            </Col>
          </Row>

          <Divider orientation="left">Student</Divider>
          <Row className={styles.details}>
            <Col xs={8} sm={7} md={{ span: 2, offset: 2 }}>
              <Text>Student ID:</Text>
            </Col>
            <Col xs={16} sm={17} md={6}>
              <Input type="text" disabled value={registrationDetails.StudentSerialNumber} />
            </Col>

            <Col xs={8} sm={7} md={{ span: 2, offset: 1 }}>
              <Text>Name:</Text>
            </Col>
            <Col xs={16} sm={17} md={6}>
              <Input type="text" disabled value={registrationDetails.StudentName} />
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
            <Col className={`gutter-row ${styles.requestDetails}`} xs={24} sm={24} md={24}>
              <Tabs type="card">
                <TabPane tab="Registration Details" key="1">
                  <RegistrationUpdateForm fieldNames={fieldNames} initialFormValue={registrationDetails} />
                </TabPane>
                <TabPane tab="Drop/Withdraw/Delete" key="2">
                  <RegistrationActionForm fieldNames={actionFieldName} initialFormValue={registrationDetails} />
                </TabPane>
                <TabPane tab="Question Responses" key="3">
                  <RegistrationQuestionsForm
                    sectionID={registrationDetails.SectionID}
                    studentID={registrationDetails.StudentID}
                  />
                </TabPane>
                <TabPane tab="Final Grade" key="4">
                  <RegistrationGradeForm fieldNames={gradeFieldName} initialFormValue={registrationDetails} />
                </TabPane>
                <TabPane tab="Issue Certificate" key="5">
                  <Typography.Text style={{ marginLeft: "20px" }}>Coming Soon....</Typography.Text>
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </div>
      )}
      {!registrationDetails && !apiCallInProgress && (
        <div
          style={{
            textAlign: "center",
            margin: "auto",
            fontSize: "2em",
            opacity: 0.5,
            marginTop: "30vh",
            width: "50%"
          }}
        >
          Registration with secitonID {sectionID} and studentID {studentID} not found
        </div>
      )}
    </>
  )
}
export default RegistrationDetailsPage
