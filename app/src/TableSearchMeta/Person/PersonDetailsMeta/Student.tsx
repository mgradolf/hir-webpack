import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  createUpdateStudentHold,
  pushStudent,
  searchOnlineClasses,
  searchStudentSchedule
} from "~/ApiServices/Service/StudentService"
import { IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { CardContainer, IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { renderBoolean, renderDate, sortByTime } from "~/Component/Common/ResponsiveTable"
import { getCertificateTableColumns } from "~/TableSearchMeta/Certificate/CertificateTableColumns"
import { getProgramApplicationTableColumns } from "~/TableSearchMeta/ProgramApplication/ProgramApplicationTableColumns"
import { getProgramEnrollmentTableColumns } from "~/TableSearchMeta/ProgramEnrollment/ProgramEnrollmentTableColumns"
import { getRegistrationTableColumns } from "~/TableSearchMeta/Registration/RegistrationTableColumns"
import { getWaitlistEntriesTableColumns } from "~/TableSearchMeta/WaitlistEntries/WaitlistEntryTableColumns"
import { getStudentCommentTableColumns } from "~/TableSearchMeta/StudentComment/CommentTableColumns"
import { getEnrollmentTableColumns } from "~/TableSearchMeta/Enrollment/EnrollmentTableColumns"
import {
  REFRESH_PAGE,
  REFRESH_REGISTRATION_ENROLLMENT_HISTORY_PAGE,
  REFRESH_STUDENT_COMMENT_PAGE
} from "~/utils/EventBus"
import CommentCreateModalOpenButton from "~/Component/Comment/CommentAddLink"
import { COMMENT_TYPES } from "~/utils/Constants"
import { Button } from "antd"
import { MetaDrivenFormModal } from "~/Component/Common/Modal/MetaDrivenFormModal/MetaDrivenFormModal"
import { StudentHoldFormMeta } from "~/Component/Student/FormMeta/StudentHoldFormMeta"
import { StudentFormMeta } from "~/Component/Student/FormMeta/StudentFormMeta"
import { getStudentHoldTableColumns } from "~/TableSearchMeta/StudentHold/StudentHoldTableColumns"

const StudentFormModalOpenButton = (props: { studentData: { [key: string]: any } }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {setShowModal && (
        <Button type="ghost" onClick={() => setShowModal && setShowModal(true)}>
          Edit
        </Button>
      )}
      {showModal && (
        <MetaDrivenFormModal
          meta={StudentFormMeta}
          title={"Update Student"}
          initialFormValue={props.studentData}
          defaultFormValue={{
            PersonID: props.studentData.PersonID,
            StudentID: props.studentData.StudentID,
            oca: props.studentData.oca
          }}
          formSubmitApi={pushStudent}
          refreshEventAfterFormSubmission={REFRESH_PAGE}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  )
}

const HoldFormModalOpenButton = (props: { StudentID: number }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {setShowModal && (
        <Button type="primary" onClick={() => setShowModal && setShowModal(true)}>
          + Apply Hold
        </Button>
      )}
      {showModal && (
        <MetaDrivenFormModal
          meta={StudentHoldFormMeta}
          title={"Apply Hold"}
          initialFormValue={{ StudentID: props.StudentID }}
          defaultFormValue={{ StudentID: props.StudentID, HoldBy: "JoeAdmin" }}
          formSubmitApi={createUpdateStudentHold}
          refreshEventAfterFormSubmission={"REFRESH_HOLD_TAB"}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  )
}

export const getStudentMeta = (person: any, student: any): IDetailsTabMeta[] => {
  const tabMetas: IDetailsTabMeta[] = []

  const studentInfo: CardContainer = {
    title: "Student Info",
    cardActions: [<StudentFormModalOpenButton studentData={student} />],
    contents: [
      { label: "Serial Num", value: student?.StudentSerialNumber },
      { label: "Organization", value: student?.Organization },
      { label: "Start Date", value: student?.StartDate, render: renderDate },
      { label: "End Date", value: student?.EndDate, render: renderDate },
      { label: "Academic Standing", value: student?.AcademicStandingTypeName },
      { label: "Status", value: student?.StudentStatusCodeName },
      { label: "Commuter", value: student?.IsCommuter, render: renderBoolean },
      { label: "Solicit For Marketing", value: student?.AllowMarketing, render: renderBoolean },
      { label: "Family Educational Rights and Privacy Act (FERPA)", value: student?.FERPA, render: renderBoolean },
      { label: "Active", value: student?.IsActive, render: renderBoolean }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [studentInfo]
  }

  tabMetas.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: summaryMeta
  })

  tabMetas.push({
    tabTitle: "Schedule",
    tabType: "table",
    tabMeta: [],
    multipleTabMetas: [
      {
        tabTitle: "On Site",
        tabType: "table",
        tabMeta: {
          tableProps: {
            columns: [
              {
                title: "From Date",
                dataIndex: "StartDate",
                render: renderDate,
                sorter: (a: any, b: any) => sortByTime(a.StartDate, b.StartDate)
              },
              { title: "From Time", dataIndex: "StartTime" },
              {
                title: "To Date",
                dataIndex: "EndDate",
                render: renderDate,
                sorter: (a: any, b: any) => sortByTime(a.EndDate, b.EndDate)
              },
              { title: "To Time", dataIndex: "EndTime" },
              {
                title: "Section",
                dataIndex: "SectionNumber",
                render: (text: any, record: any) => <Link to={`/section/${record.SectionID}`}>{text}</Link>
              },
              {
                title: "Offering",
                dataIndex: "OfferingName",
                render: (text: any, record: any) => <Link to={`/offering/${record.OfferingID}`}>{text}</Link>
              },
              { title: "Location", dataIndex: "Location" }
            ],
            searchFunc: searchStudentSchedule,
            responsiveColumnIndices: [],
            expandableColumnIndices: [],
            searchParams: { StudentID: student.StudentID },
            refreshEventName: "REFRESH_STUDENT_SCHEDULE_TAB"
          }
        }
      },
      {
        tabTitle: "Online",
        tabType: "table",
        tabMeta: {
          tableProps: {
            columns: [
              {
                title: "StartDate",
                dataIndex: "StartDate",
                render: renderDate,
                sorter: (a: any, b: any) => sortByTime(a.StartDate, b.StartDate)
              },
              {
                title: "EndDate",
                dataIndex: "EndDate",
                render: renderDate,
                sorter: (a: any, b: any) => sortByTime(a.EndDate, b.EndDate)
              },
              {
                title: "Section",
                dataIndex: "SectionNumber",
                render: (text: any, record: any) => <Link to={`/section/${record.SectionID}`}>{text}</Link>
              },
              {
                title: "Offering",
                dataIndex: "OfferingName",
                render: (text: any, record: any) => <Link to={`/offering/${record.OfferingID}`}>{text}</Link>
              }
            ],
            searchFunc: searchOnlineClasses,
            responsiveColumnIndices: [],
            expandableColumnIndices: [],
            searchParams: { StudentID: student.StudentID },
            refreshEventName: "REFRESH_HOLD_TAB"
          }
        }
      }
    ]
  })

  tabMetas.push({
    tabTitle: "Registrations",
    tabType: "table",
    tabMeta: [],
    multipleTabMetas: [
      {
        tabTitle: "Roster",
        tabType: "table",
        tabMeta: {
          tableProps: {
            ...getRegistrationTableColumns(false),
            searchParams: { StudentID: student.StudentID },
            refreshEventName: "REFRESH_REGISTRATION_TAB"
          }
        }
      },
      {
        tabTitle: "History",
        tabType: "table",
        tabMeta: {
          tableProps: {
            pagination: false,
            ...getEnrollmentTableColumns(),
            searchParams: { StudentID: student.StudentID },
            refreshEventName: REFRESH_REGISTRATION_ENROLLMENT_HISTORY_PAGE
          }
        }
      },
      {
        tabTitle: "Waitlist",
        tabType: "table",
        tabMeta: {
          tableProps: {
            ...getWaitlistEntriesTableColumns(false),
            searchParams: {
              RequesterRecipientPersonID1: person.PersonID,
              RequesterRecipientPersonID2: person.PersonID
            },
            refreshEventName: "REFRESH_PERSON_TAB"
          }
        }
      }
    ]
  })

  tabMetas.push({
    tabTitle: "Programs",
    tabType: "table",
    tabMeta: [],
    multipleTabMetas: [
      {
        tabTitle: "Applications",
        tabType: "table",
        tabMeta: {
          tableProps: {
            ...getProgramApplicationTableColumns(false),
            searchParams: { studentID: student.StudentID },
            refreshEventName: "REFRESH_APPLICATION_TAB"
          }
        }
      },
      {
        tabTitle: "Enrollments",
        tabType: "table",
        tabMeta: {
          tableProps: {
            ...getProgramEnrollmentTableColumns(false),
            searchParams: { studentID: student.StudentID },
            refreshEventName: "REFRESH_ENROLLMMENT_TAB"
          }
        }
      }
    ]
  })

  tabMetas.push({
    tabTitle: "Certificates",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getCertificateTableColumns(false),
        searchParams: { StudentID: student.StudentID },
        refreshEventName: "REFRESH_CERTIFICATE_TAB"
      }
    }
  })

  tabMetas.push({
    tabTitle: "Holds",
    tabType: "table",
    tabMeta: {
      blocks: [<HoldFormModalOpenButton StudentID={student.StudentID} />],
      tableProps: {
        pagination: false,
        ...getStudentHoldTableColumns(),
        searchParams: student.StudentID,
        refreshEventName: "REFRESH_HOLD_TAB"
      }
    }
  })

  tabMetas.push({
    tabTitle: "Comments",
    tabType: "table",
    tabMeta: {
      blocks: [<CommentCreateModalOpenButton StudentID={student.StudentID} CommentType={COMMENT_TYPES.GENERAL} />],
      tableProps: {
        pagination: false,
        ...getStudentCommentTableColumns(),
        searchParams: { StudentID: student.StudentID },
        refreshEventName: REFRESH_STUDENT_COMMENT_PAGE
      }
    }
  })
  return tabMetas
}
