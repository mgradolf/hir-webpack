import { CardContainer } from "~/Component/Common/Page/DetailsPage/StandardDetailsPage"
import { renderBoolean, renderDate } from "~/Component/Common/ResponsiveTable"

// "MaxEnrollment" : 500,
//     "NoteID" : null,
//     "Email" : null,
//     "ClockHours" : null,

//     "AttendanceUnitID" : null,
//     "oca" : 14,

//     "URL" : null,
//     "MinEnrollment" : 0,
//     "MaxCEUCredit" : null,
//     "FiscalPeriodCodeID" : 34,
//     "LoadHours" : null,
//     "CancelReasonCodeID" : null,
//     "EndTermID" : null,
//     "SectionID" : 10825,
//     "SectionUsageType" : 1,
//     "RecurrenceRule" : null,
//     "CreditTypeID" : 2002,
//     "SectionTypeID" : 2123,
//     "StartTermID" : null,
//     "DefaultEnrollmentDuration" : null,
//     "RefundPolicyTypeID" : null,
//     "RoomID" : null,
//     "PaymentGatewayAccountID" : 9,
//     "SectionStatusCodeID" : 3,
//     "CEUHours" : null,
//     "ShowSiteOnly" : false,
//     "GradeScaleTypeID" : 2046,
//     "LectureLabRatio" : null,
//     "SectionStatusReleaseID" : 1,
//     "CreditHours" : 40.0,
//     "AttendanceExpected" : null,
//     "OfferingID" : 6824,
//     "BusinessID" : null,
//     "SubmitInquiryToUserID" : null
export const getSectionDetailsMeta = (section: { [key: string]: any }): CardContainer[] => {
  const sectionInfo: CardContainer = {
    title: section.SectionNumber,
    contents: [
      { label: "Email", value: section.Email, render: undefined },
      { label: "Description", value: section.Description, render: undefined },
      { label: "Active", value: section.IsActive, render: renderBoolean },
      { label: "Grades Entered", value: section.IsGradesEntered, render: renderBoolean },
      { label: "Distance Learning", value: section.IsDistanceLearning, render: renderBoolean }
    ]
  }

  const dates: CardContainer = {
    title: "Dates",
    contents: [
      { label: "CreationDate", value: section.CreationDate, render: renderDate },
      { label: "BillingDate", value: section.BillingDate, render: renderDate },
      { label: "StartDate", value: section.StartDate, render: renderDate },
      { label: "EffectiveTerminationDate", value: section.EffectiveTerminationDate, render: renderDate },
      { label: "TerminationDate", value: section.TerminationDate, render: renderDate },
      { label: "FinalEnrollmentDate", value: section.FinalEnrollmentDate, render: renderDate },
      { label: "EndDate", value: section.EndDate, render: renderDate },
      { label: "EffectiveCreationDate", value: section.EffectiveCreationDate, render: renderDate }
    ]
  }

  return [sectionInfo, dates]
}
