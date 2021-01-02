import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { renderDate } from "~/Component/Common/ResponsiveTable"
import { getTagsTabPageDetailsMeta } from "~/FormMeta/Tags/TagsTabPageDetailsMeta"

export const getProgramDetailsMeta = (program: { [key: string]: any }): IDetailsMeta => {
  const info: CardContainer = {
    contents: [
      { label: "Name", value: program.Name },
      { label: "Description", value: program.Description },
      { label: "Status", value: program.ProgramStatusName },
      { label: "Start Date", value: program.ProgramStartDate, render: renderDate },
      { label: "End Date", value: program.ProgramEndDate, render: renderDate },
      { label: "Inquiry Recipient", value: program.SubmitInquiryToUserID },
      { label: "Certificate/License", value: program.CertificateName },
      { label: "No Specific Timeframe", value: "" },
      { label: "Number of Months from the first Offering taken", value: program.CompletionMonth }
    ]
  }

  const application: CardContainer = {
    title: "Applicationn",
    contents: [
      { label: "Application Required", value: "" },
      { label: "Start Date", value: program.ApplicationStartDate, render: renderDate },
      { label: "End Date", value: program.ApplicationEndDate, render: renderDate }
    ]
  }
  const enrollment: CardContainer = {
    title: "Enrollment",
    contents: [
      { label: "Start Date", value: program.EnrollmentStartDate, render: renderDate },
      { label: "End Date", value: program.EnrollmentEndDate, render: renderDate },
      { label: "Seat Capacity", value: program.SeatCapacity }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [info, application, enrollment]
  }

  return {
    pageTitle: `Program Code - ${program.ProgramCode}`,
    tabs: [
      {
        tabTitle: "Summary",
        tabType: "summary",
        tabMeta: summaryMeta
      },
      {
        tabTitle: "Tags",
        tabType: "summary",
        tabMeta: [],
        multipleTabMetas: getTagsTabPageDetailsMeta({ EntityType: "Program", EntityID: program.ProgramID }).tabs
      }
    ]
  }
}
