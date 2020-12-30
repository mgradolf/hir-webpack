import React from "react"
import { Link } from "react-router-dom"
import { findStudentHold } from "~/ApiServices/BizApi/student/studentHoldIF"
import { searchOnlineClasses, searchStudentSchedule } from "~/ApiServices/Service/StudentService"
import { IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { CardContainer, IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { renderBoolean, renderDate, sortByTime } from "~/Component/Common/ResponsiveTable"
import { getActivityAcademicTableColumn } from "~/FormMeta/ActivityAcademic/getActivityAcademicTableColumn"
import { getCertificateTableColumns } from "~/FormMeta/Certificate/CertificateTableColumns"
import { getProgramApplicationTableColumns } from "~/FormMeta/ProgramApplication/ProgramApplicationTableColumns"
import { getProgramEnrollmentTableColumns } from "~/FormMeta/ProgramEnrollment/ProgramEnrollmentTableColumns"
import { getRegistrationTableColumns } from "~/FormMeta/Registration/RegistrationTableColumns"
import { getWaitlistEntriesTableColumns } from "~/FormMeta/WaitlistEntries/WaitlistEntryTableColumns"
import { getStudentCommentTableColumns } from "~/FormMeta/StudentComment/CommentTableColumns"
import { REFRESH_STUDENT_COMMENT_PAGE } from "~/utils/EventBus"
import CommentCreateModalOpenButton from "~/Component/Comment/CommentAddLink"
import { COMMENT_TYPES } from "~/utils/Constants"

export const getStudentMeta = (person: any, student: any): IDetailsTabMeta[] => {
  const tabMetas: IDetailsTabMeta[] = []

  const studentInfo: CardContainer = {
    title: "Student Info",
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

  tabMetas.push({ tabTitle: "Summary", tabType: "summary", tabMeta: summaryMeta })

  tabMetas.push({
    tabTitle: "Schedule",
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
            title: "Offering Name",
            dataIndex: "OfferingName",
            render: (text: any, record: any) => <Link to={`/offering/${record.OfferingID}`}>{text}</Link>
          },
          {
            title: "Section Number",
            dataIndex: "SectionNumber",
            render: (text: any, record: any) => <Link to={`/section/${record.SectionID}`}>{text}</Link>
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
  })

  tabMetas.push({
    tabTitle: "Online Classes",
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
            title: "Section Number",
            dataIndex: "SectionNumber",
            render: (text: any, record: any) => <Link to={`/section/${record.SectionID}`}>{text}</Link>
          },
          {
            title: "Offering Code",
            dataIndex: "OfferingCode",
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
  })

  tabMetas.push({
    tabTitle: "Registrations",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getRegistrationTableColumns(false),
        searchParams: { StudentID: student.StudentID },
        refreshEventName: "REFRESH_REGISTRATION_TAB"
      }
    }
  })

  tabMetas.push({
    tabTitle: "Waitlist",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getWaitlistEntriesTableColumns(false),
        searchParams: { RequesterRecipientPersonID1: person.PersonID, RequesterRecipientPersonID2: person.PersonID },
        refreshEventName: "REFRESH_PERSON_TAB"
      }
    }
  })

  tabMetas.push({
    tabTitle: "Program Applications",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getProgramApplicationTableColumns(false),
        searchParams: { PersonID: person.PersonID },
        refreshEventName: "REFRESH_APPLICATION_TAB"
      }
    }
  })

  tabMetas.push({
    tabTitle: "Program Enrollments",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getProgramEnrollmentTableColumns(false),
        searchParams: { PersonID: person.PersonID },
        refreshEventName: "REFRESH_ENROLLMMENT_TAB"
      }
    }
  })

  tabMetas.push({
    tabTitle: "Certificates",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getCertificateTableColumns(false),
        searchParams: { PersonID: person.PersonID },
        refreshEventName: "REFRESH_CERTIFICATE_TAB"
      }
    }
  })

  tabMetas.push({
    tabTitle: "Hold",
    tabType: "table",
    tabMeta: {
      tableProps: {
        columns: [
          { title: "Hold Date", dataIndex: "EndDate", render: renderDate },
          { title: "Hold Type", dataIndex: "HoldType" },
          { title: "Hold Reason", dataIndex: "HoldReason" },
          { title: "Hold By", dataIndex: "HoldBy" },
          { title: "Release Date", dataIndex: "ReleaseDate", render: renderDate },
          { title: "Release Reason", dataIndex: "ReleaseReason" },
          { title: "Release By", dataIndex: "ReleasedBy" }
        ],
        searchFunc: findStudentHold,
        responsiveColumnIndices: [],
        expandableColumnIndices: [],
        searchParams: student.StudentID,
        refreshEventName: "REFRESH_HOLD_TAB"
      }
    }
  })

  tabMetas.push({
    tabTitle: "Activity Log",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getActivityAcademicTableColumn(false),
        searchParams: { StudentID: student.StudentID },
        refreshEventName: "REFRESH_ACTITVITY_LOG_TAB"
      }
    }
  })
  student &&
    tabMetas.push({
      tabTitle: "Enrollment Log",
      tabType: "table",
      tabMeta: {
        tableProps: {
          ...getProgramEnrollmentTableColumns(false),
          searchParams: { StudentID: student.StudentID },
          refreshEventName: "REFRESH_ENROLLMMENT_LOG_TAB"
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
