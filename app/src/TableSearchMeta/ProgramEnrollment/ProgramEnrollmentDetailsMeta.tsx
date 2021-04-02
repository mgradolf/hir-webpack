import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Button, Typography } from "antd"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import { renderDate, renderEmail } from "~/Component/Common/ResponsiveTable"
import UpdateProgramEnrollment from "~/Component/Feature/ProgramEnrollment/ProgramEnrollmentFormModal"
import { getRequirementGroupDetailsTableColumns } from "~/TableSearchMeta/ProgramEnrollment/RequirementGroupDetailsTableColumns"
import {
  REFRESH_PROGRAM_ENROLLMENT_REQUIREMENT_GROUP_DETAILS_PAGE,
  REFRESH_PROGRAM_ENROLLMENT_REQUIREMENT_GROUP_PAGE
} from "~/utils/EventBus"
import { getRequirementGroupTableColumns } from "~/TableSearchMeta/ProgramEnrollment/RequirementGroupTableColumns"
import {
  PROGRAM_ENROLLMENT_COMPLETED,
  PROGRAM_ENROLLMENT_ENROLLED,
  PROGRAM_ENROLLMENT_WITHRAWN
} from "~/utils/Constants"

export const getProgramEnrollmentDetailsMeta = (programEnrollment: { [key: string]: any }): IDetailsMeta => {
  const EnrollmentFormModalOpenButton = (props: { enrollmentID: number; statusID: number }) => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        {setShowModal && (
          <Button
            disabled={
              props.statusID === PROGRAM_ENROLLMENT_COMPLETED ||
              props.statusID === PROGRAM_ENROLLMENT_WITHRAWN ||
              props.statusID === PROGRAM_ENROLLMENT_ENROLLED
            }
            type="primary"
            style={{ float: "right" }}
            onClick={() => setShowModal && setShowModal(true)}
          >
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
        value: (
          <>
            <Typography.Text>{programEnrollment.StatusName}</Typography.Text>
            <EnrollmentFormModalOpenButton
              enrollmentID={programEnrollment.ProgramEnrollmentID}
              statusID={programEnrollment.StatusID}
            />
          </>
        )
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
