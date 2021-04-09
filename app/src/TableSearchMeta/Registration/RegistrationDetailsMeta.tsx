import { Button } from "antd"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { CertificateFormModal } from "~/Component/Feature/Certificate/CertificateFormModal"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { CardContents, IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import { renderDate } from "~/Component/Common/ResponsiveTable"
import RegistrationDetailsMenu from "~/Component/Feature/Registration/RegistrationDetailsMenu"
import RegistrationGradeFormModal from "~/Component/Feature/Registration/RegistrationGradeFormModal"
import {
  REFRESH_REGISTRATION_COMMENT_PAGE,
  REFRESH_REGISTRATION_CERTIFICATE_PAGE,
  REFRESH_REGISTRATION_ENROLLMENT_HISTORY_PAGE,
  REFRESH_REGISTRATION_ACADEMIC_ACTIVITY_PAGE,
  REFRESH_REGISTRATION_ENROLLMENT_ACTIVITY_PAGE
} from "~/utils/EventBus"
import { getCertificateTableColumns } from "~/TableSearchMeta/Certificate/CertificateTableColumns"
import { getEnrollmentTableColumns } from "~/TableSearchMeta/Enrollment/EnrollmentTableColumns"
import { getAcademicActivityLogTableColumns } from "~/TableSearchMeta/Academic/AcademicActivityTableColumns"
import { getEnrollmentActivityLogTableColumns } from "~/TableSearchMeta/EnrollmentActivity/EnrollmentActivityTableColumns"
import { getRegistrationCommentTableColumns } from "~/TableSearchMeta/RegistrationComment/CommentTableColumns"
import CommentCreateModalOpenButton from "~/Component/Feature/Comment/CommentAddLink"
import { COMMENT_TYPES } from "~/utils/Constants"

export const getRegistrationDetailsMeta = (registration: { [key: string]: any }): IDetailsMeta => {
  const getQuestionResponses = () => {
    const questionList: Array<CardContents> = []
    registration.QuestionResponses.forEach((element: any) => {
      questionList.push({ label: element.Question, value: element.AnswerText })
    })
    return questionList
  }

  const summary: CardContainer = {
    title: `${registration.SectionNumber}`,
    cardActions: [<RegistrationDetailsMenu dataLoaded={registration} />],
    contents: [
      {
        label: "Offering",
        value: <Link to={`/offering/${registration.OfferingID}`}>{registration.OfferingName}</Link>
      },
      {
        label: "Section Number",
        value: <Link to={`/section/${registration.SectionID}`}>{registration.SectionNumber}</Link>
      },
      {
        label: "Student",
        value: <Link to={`/person/student/${registration.StudentID}`}>{registration.StudentName}</Link>
      },
      { label: "Student ID", value: registration.StudentSerialNumber },
      { label: "Enrollment Status", value: registration.EnrollmentStatus },
      { label: "Registration Date", value: registration.RegistrationDate, render: renderDate },
      { label: "Withdrawal Date", value: registration.WithdrawalDate, render: renderDate },
      { label: "Graded Date", value: registration.GradedDate, render: renderDate },
      { label: "Grade Scale", value: registration.GradeScaleType },
      { label: "Expected Attendance", value: registration.AttendanceExpected },
      ...getQuestionResponses()
    ]
  }

  const RegistrationGradeFormModalOpenButton = (props: { registration: { [key: string]: any } }) => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        {setShowModal && (
          <Button type="primary" onClick={() => setShowModal && setShowModal(true)}>
            Edit
          </Button>
        )}
        {showModal && (
          <RegistrationGradeFormModal initialFormValue={registration} closeModal={() => setShowModal(false)} />
        )}
      </>
    )
  }

  const gradeInfo: CardContainer = {
    title: "Grade Info",
    cardActions: [<RegistrationGradeFormModalOpenButton registration={registration} />],
    contents: [
      { label: "Credit", value: registration.GPAValue },
      { label: "Final Grade", value: registration.AlphaValue },
      { label: "Actual Attendance", value: registration.AttendanceActual }
    ]
  }

  const orderInfo: CardContainer = {
    title: "Order Info",
    contents: [
      { label: "Order ID", value: <Link to={`/order/${registration.OrderID}`}>{registration.OrderID}</Link> },
      { label: "Account", value: <Link to={`/account/${registration.AccountID}`}>{registration.AccountName}</Link> },
      { label: "Package", value: registration.PackageName },
      { label: "Seat Group", value: registration.SeatGroup }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [summary, gradeInfo, orderInfo]
  }

  const enrollmentMeta: IDetailsTableTabProp = {
    tableProps: {
      pagination: false,
      ...getEnrollmentTableColumns(),
      searchParams: { SectionID: registration.SectionID, StudentID: registration.StudentID },
      refreshEventName: REFRESH_REGISTRATION_ENROLLMENT_HISTORY_PAGE
    }
  }

  const academicActivityMeta: IDetailsTableTabProp = {
    tableProps: {
      pagination: false,
      ...getAcademicActivityLogTableColumns(),
      searchParams: { SectionIDs: [registration.SectionID], StudentIDs: [registration.StudentID] },
      refreshEventName: REFRESH_REGISTRATION_ACADEMIC_ACTIVITY_PAGE
    }
  }

  const enrollmentActivityMeta: IDetailsTableTabProp = {
    tableProps: {
      pagination: false,
      ...getEnrollmentActivityLogTableColumns(),
      searchParams: { SectionIDs: [registration.SectionID], StudentID: registration.StudentID },
      refreshEventName: REFRESH_REGISTRATION_ENROLLMENT_ACTIVITY_PAGE
    }
  }

  const certificateMeta: IDetailsTableTabProp = {
    blocks: [
      <CertificateFormModal editMode={true} isProgram={false} initialValues={{ ...registration, IsProgram: false }} />
    ],
    tableProps: {
      pagination: false,
      ...getCertificateTableColumns(true),
      searchParams: { SectionID: registration.SectionID, StudentID: registration.StudentID },
      refreshEventName: REFRESH_REGISTRATION_CERTIFICATE_PAGE
    }
  }

  const commentMeta: IDetailsTableTabProp = {
    blocks: [
      <CommentCreateModalOpenButton
        SectionID={registration.SectionID}
        StudentID={registration.StudentID}
        CommentType={COMMENT_TYPES.ENROLLMENT}
      />
    ],
    tableProps: {
      pagination: false,
      ...getRegistrationCommentTableColumns(),
      searchParams: { SectionID: registration.SectionID, StudentID: registration.StudentID },
      refreshEventName: REFRESH_REGISTRATION_COMMENT_PAGE
    }
  }

  const tabMetas: IDetailsTabMeta[] = [
    {
      tabTitle: "Summary",
      tabType: "summary",
      tabMeta: summaryMeta
    },
    {
      tabTitle: "Enrollment History",
      tabType: "table",
      tabMeta: enrollmentMeta
    },
    {
      tabTitle: "Certificates",
      tabType: "table",
      tabMeta: certificateMeta
    },
    {
      tabTitle: "Comments",
      tabType: "table",
      tabMeta: commentMeta
    },
    {
      tabTitle: "Logs",
      tabType: "table",
      tabMeta: [],
      multipleTabMetas: [
        {
          tabTitle: "Enrollment",
          tabType: "table",
          tabMeta: enrollmentActivityMeta
        },
        {
          tabTitle: "Academic",
          tabType: "table",
          tabMeta: academicActivityMeta
        }
      ]
    }
  ]

  return {
    pageTitle: `${registration.StudentName}`,
    tabs: tabMetas
  }
}
