import React from "react"
import { Link } from "react-router-dom"
import { getFinancialsByTarget } from "~/ApiServices/BizApi/financial/financialIF"
import { searchInstructorOfferings, searchSectionInstructor } from "~/ApiServices/Service/InstructorService"
import { getFacultySchedule } from "~/ApiServices/Service/PersonService"
import CommentCreateModalOpenButton from "~/Component/Comment/CommentAddLink"
import { IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { CardContainer, IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { renderBoolean, renderDate, renderDateTime, renderEmail, sortByTime } from "~/Component/Common/ResponsiveTable"
import { getFacultyCommentTableColumns } from "~/FormMeta/InstructorComment/CommentTableColumns"
import { COMMENT_TYPES } from "~/utils/Constants"
import { REFRESH_INSTRUCTOR_COMMENT_PAGE } from "~/utils/EventBus"

export const getInstructorMeta = (person: any, instructor: any): IDetailsTabMeta[] => {
  const tabMetas: IDetailsTabMeta[] = []

  const instructorInfo: CardContainer = {
    title: "Instructor Info",
    contents: [
      { label: "Serial Num", value: instructor?.FacultySerialNum },
      { label: "Organization", value: instructor?.OrganizationName },
      { label: "Status", value: instructor?.InstitutionStatusCodeName },
      { label: "Type", value: instructor?.InstructorTypeName },
      { label: "Active", value: instructor?.IsActive, render: renderBoolean }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [instructorInfo]
  }

  tabMetas.push({ tabTitle: "Summary", tabType: "summary", tabMeta: summaryMeta })
  tabMetas.push({
    tabTitle: "Faculty Schedule",
    tabType: "table",
    tabMeta: {
      tableProps: {
        columns: [
          {
            title: "Start Date",
            dataIndex: "StartDate",
            render: renderDateTime,
            sorter: (a: any, b: any) => sortByTime(a.StartDate, b.StartDate)
          },
          // {
          //   title: "Start Time",
          //   dataIndex: "StartTime"
          // },
          {
            title: "End Date",
            dataIndex: "EndDate",
            render: renderDateTime,
            sorter: (a: any, b: any) => sortByTime(a.EndDate, b.EndDate)
          },
          // { title: "End Time", dataIndex: "EndTime" },
          { title: "Schedule Item", dataIndex: "Name" }
        ],
        searchFunc: getFacultySchedule,
        responsiveColumnIndices: [],
        expandableColumnIndices: [],
        searchParams: { PersonID: person.PersonID },
        refreshEventName: "REFRESH_FACULTY_SCHEDULE_TAB"
      }
    }
  })

  tabMetas.push({
    tabTitle: "Instructor Fees",
    tabType: "table",
    tabMeta: {
      tableProps: {
        columns: [
          { title: "Is Charge", dataIndex: "IsCharge", render: renderBoolean },
          { title: "Amount", dataIndex: "ItemUnitAmount" },
          { title: "GL Account", dataIndex: "GLAccountID" },
          { title: "Active", dataIndex: "IsActive", render: renderBoolean }
        ],
        searchFunc: (Params: any) => getFinancialsByTarget(instructor.FacultyID, 2),
        responsiveColumnIndices: [],
        expandableColumnIndices: [],
        searchParams: { FacultyID: instructor.FacultyID, FinancialTypeID: 2 },
        refreshEventName: "REFRESH_FACULTY_OFFERINGS_TAB"
      }
    }
  })

  tabMetas.push({
    tabTitle: "Qualified Offerings",
    tabType: "table",
    tabMeta: {
      tableProps: {
        columns: [
          {
            title: "OfferingName",
            dataIndex: "OfferingName",
            render: (text: any, record: any) => <Link to={`/offering/${record.OfferingID}`}>{text}</Link>
          },
          { title: "Status", dataIndex: "StatusCode" },
          { title: "Department Name", dataIndex: "OrganizationName" }
        ],
        searchFunc: searchInstructorOfferings,
        responsiveColumnIndices: [],
        expandableColumnIndices: [],
        searchParams: { FacultyID: instructor.FacultyID },
        refreshEventName: "REFRESH_FACULTY_OFFERINGS_TAB"
      }
    }
  })

  tabMetas.push({
    tabTitle: "Instructor Contracts",
    tabType: "table",
    tabMeta: {
      tableProps: {
        columns: [
          {
            title: "Name",
            dataIndex: "FirstName",
            render: (text: any, record: any) => (
              <Link to={`/person/${record.PersonID}`}>{text + " " + record.LastName}</Link>
            )
          },
          { title: "Email", dataIndex: "EmailAddress", render: renderEmail },
          {
            title: "Section Number",
            dataIndex: "SectionNumber",
            render: (text: any, record: any) => <Link to={`/section/${record.SectionID}`}>{text}</Link>
          },
          { title: "Status", dataIndex: "SectionStatusCodeName" },
          { title: "StartDate", dataIndex: "StartDate", render: renderDate },
          { title: "EndDate", dataIndex: "EndDate", render: renderDate }
        ],
        searchFunc: searchSectionInstructor,
        responsiveColumnIndices: [],
        expandableColumnIndices: [],
        searchParams: { FacultyID: instructor.FacultyID },
        refreshEventName: "REFRESH_FACULTY_CONTACT_TAB"
      }
    }
  })

  tabMetas.push({
    tabTitle: "Comments",
    tabType: "table",
    tabMeta: {
      blocks: [<CommentCreateModalOpenButton FacultyID={instructor.FacultyID} CommentType={COMMENT_TYPES.GENERAL} />],
      tableProps: {
        pagination: false,
        ...getFacultyCommentTableColumns(),
        searchParams: { FacultyID: instructor.FacultyID },
        refreshEventName: REFRESH_INSTRUCTOR_COMMENT_PAGE
      }
    }
  })
  return tabMetas
}
