import { Button, Typography } from "antd"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { IDetailsCustomTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsCustomTab"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import { renderDate, renderEmail } from "~/Component/Common/ResponsiveTable"
import UpdateProgramEnrollment from "~/Component/ProgramEnrollment/ProgramEnrollmentFormModal"
import EnrollmentProgressTrackingPage from "~/Pages/Program/EnrollmentProgressTrackingPage"
import { getRequirementGroupDetailsTableColumns } from "~/FormMeta/ProgramEnrollment/RequirementGroupDetailsTableColumns"
import { REFRESH_PROGRAM_ENROLLMENT_REQUIREMENT_GROUP_DETAILS_PAGE, REFRESH_PROGRAM_ENROLLMENT_REQUIREMENT_GROUP_PAGE } from "~/utils/EventBus"
import { getRequirementGroupTableColumns } from "~/FormMeta/ProgramEnrollment/RequirementGroupTableColumns"

export const getProgramEnrollmentDetailsMeta = (programEnrollment: { [key: string]: any }): IDetailsMeta => {

  const EnrollmentFormModalOpenButton = (props: { enrollmentID: number }) => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        {setShowModal && (
          <Button type="primary" style={{float: "right"}} onClick={() => setShowModal && setShowModal(true)}>
            Change
          </Button>
        )}
        {showModal && (
          <UpdateProgramEnrollment enrollmentID={props.enrollmentID} closeModal={() => setShowModal(false)} />
        )}
      </>
    )
  }

  const info: CardContainer = {
    contents: [
      { label: "Enrollment Date", value: programEnrollment.EnrollmentDate, render: renderDate },
      {
        label: "Status",
        value:
          <>
            <Typography.Text>{programEnrollment.StatusName}</Typography.Text>
            <EnrollmentFormModalOpenButton enrollmentID={programEnrollment.ProgramEnrollmentID} />
          </>
      },
      {
        label: "Student",
        value: <Link to={`/person/student/${programEnrollment.StudentID}`}>{programEnrollment.StudentName}</Link>
      },
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

  const groupMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getRequirementGroupTableColumns(programEnrollment),
      refreshEventName: REFRESH_PROGRAM_ENROLLMENT_REQUIREMENT_GROUP_PAGE,
      pagination: false
    }
  }

  const groupDetailsMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getRequirementGroupDetailsTableColumns(programEnrollment),
      refreshEventName: REFRESH_PROGRAM_ENROLLMENT_REQUIREMENT_GROUP_DETAILS_PAGE,
      pagination: false
    }
  }

  return {
    pageTitle: `${programEnrollment.ProgramCode} - ${programEnrollment.StudentName}`,
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
      },
      {
        tabTitle: "Progress Tracking New",
        tabType: "custom",
        tabMeta: [],
        multipleTabMetas: [
          {
            tabTitle: "Summary",
            tabType: "table",
            tabMeta: groupMeta
          },
          {
            tabTitle: "Details",
            tabType: "table",
            tabMeta: groupDetailsMeta
          }
        ]
      }
    ]
  }
}
