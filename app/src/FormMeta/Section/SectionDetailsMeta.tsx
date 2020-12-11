import React from "react"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import { renderBoolean, renderDate } from "~/Component/Common/ResponsiveTable"
import SectionEditLink from "~/Component/Section/CreateEdit/SectionEditLink"
import ScheduleCreateModal from "~/Component/Section/Schedule/ScheduleCreateModal"
import { getSchedultTableColumns } from "~/FormMeta/OfferingSchedule/ScheduleTableColumns"

export const getSectionDetailsMeta = (section: { [key: string]: any }): IDetailsMeta[] => {
  const sectionInfo: CardContainer = {
    title: section.OfferingName,
    cardActions: [<SectionEditLink section={section} PrimaryType={true} />],
    contents: [
      { label: "Description", value: section.Description, render: undefined },
      { label: "Status", value: section.StatusCode, render: undefined },
      { label: "URL", value: section.URL, render: undefined },
      { label: "Distance Learning", value: section.IsDistanceLearning, render: renderBoolean },
      { label: "StartDate", value: section.StartDate, render: renderDate },
      { label: "EndDate", value: section.EndDate, render: renderDate },
      { label: "Final Enrollment Date", value: section.FinalEnrollmentDate, render: renderDate },
      { label: "Billing Date", value: section.BillingDate, render: renderDate },
      { label: "Effective Creation Date", value: section.EffectiveCreationDate, render: renderDate },
      { label: "Effective Termination Date", value: section.EffectiveTerminationDate, render: renderDate },
      { label: "Fiscal Period", value: section.FiscalPeriodCodeName, render: undefined }
    ]
  }
  const enrollmentInfo: CardContainer = {
    title: "Enrollment",
    contents: [
      { label: "Current Enrollment", value: section.TotalEnrolledSeats, render: undefined },
      { label: "Minimum Enrollment", value: section.MinEnrollment, render: undefined },
      { label: "Maximum Enrollment", value: section.MaxEnrollment, render: undefined },
      { label: "Estimated Enrollment", value: section.TotalEstimatedEnrollments, render: undefined },
      { label: "Total Seats", value: section.TotalSeats, render: undefined },
      { label: "Total Seat Groups", value: section.TotalSeatGroups, render: undefined },
      { label: "Total Seats Used", value: section.TotalUsedSeats, render: undefined },
      { label: "Total Seats Available", value: section.TotalAvailableSeats, render: undefined }
    ]
  }

  const gradeInfo: CardContainer = {
    title: "Grades and Credits",
    contents: [
      { label: "Grade Scale", value: section.GradeScaleTypeName, render: undefined },
      { label: "Credit Type", value: section.CreditTypeName, render: undefined },
      { label: "Credit Hours", value: section.CreditHours, render: undefined },
      { label: "Clock Hours", value: section.ClockHours, render: undefined },
      { label: "Load Hours", value: section.LoadHours, render: undefined },
      { label: "CEUs", value: section.CEUHours, render: undefined },
      { label: "Expected Attendance", value: section.AttendanceExpected, render: undefined },
      { label: "Attendance Unit", value: section.AttendanceUnit, render: undefined }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [sectionInfo, enrollmentInfo, gradeInfo]
  }

  const scheduleMeta: IDetailsTableTabProp = {
    blocks: [<ScheduleCreateModal sectionId={section.SectionID} />],
    tableProps: {
      ...getSchedultTableColumns(section.SectionID),
      searchParams: { SectionID: section.SectionID }
    }
  }

  return [
    {
      title: "Summary",
      type: "summary",
      meta: summaryMeta
    },
    {
      title: "Schedule and Instructor Data",
      type: "table",
      meta: scheduleMeta
    }
  ]
}
