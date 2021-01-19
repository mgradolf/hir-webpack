import { Button } from "antd"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { IDetailsCustomTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsCustomTab"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { renderDate, renderEmail } from "~/Component/Common/ResponsiveTable"
import UpdateProgramEnrollment from "~/Component/ProgramEnrollment/ProgramEnrollmentFormModal"
import EnrollmentProgressTrackingPage from "~/Pages/Program/EnrollmentProgressTrackingPage"

export const getProgramEnrollmentDetailsMeta = (programEnrollment: { [key: string]: any }): IDetailsMeta => {
  const EnrollmentFormModalOpenButton = (props: { enrollmentID: number }) => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        {setShowModal && (
          <Button type="primary" onClick={() => setShowModal && setShowModal(true)}>
            Edit
          </Button>
        )}
        {showModal && <UpdateProgramEnrollment enrollmentID={props.enrollmentID} closeModal={() => setShowModal(false)} />}
      </>
    )
  }

  const info: CardContainer = {
    cardActions: [<EnrollmentFormModalOpenButton enrollmentID={programEnrollment.ProgramEnrollmentID} />],
    contents: [
      { label: "Enrollment Date", value: programEnrollment.EnrollmentDate, render: renderDate },
      { label: "Status", value: programEnrollment.StatusName },
      { label: "Student", value: <Link to={`/person/student/${programEnrollment.StudentID}`}>{programEnrollment.StudentName}</Link> },
      { label: "Email", value: programEnrollment.Email, render: renderEmail },
      { label: "Certificate Issued", value: programEnrollment.FinalStatusDate, render: renderDate },
      { label: "Order ID", value: <Link to={`/order/${programEnrollment.OrderID}`}>{programEnrollment.OrderID}</Link> },
      { label: "Comments", value: programEnrollment.CommentText },
      { label: "Application", value: programEnrollment.ProgramApplicationName }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [info]
  }

  const progressTrackingMeta: IDetailsCustomTabProp = {
    component: EnrollmentProgressTrackingPage,
    props: { programID: programEnrollment.ProgramID, studentID: programEnrollment.StudentID }
  }

  return {
    pageTitle: `Program Code - ${programEnrollment.ProgramCode}`,
    tabs: [
      {
        tabTitle: "Summary",
        tabType: "summary",
        tabMeta: summaryMeta
      },
      {
        tabTitle: "Progress Tracking",
        tabType: "custom",
        tabMeta: progressTrackingMeta
      }
    ]
  }
}
