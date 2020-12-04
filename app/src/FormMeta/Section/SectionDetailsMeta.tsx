import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { renderBoolean, renderDate } from "~/Component/Common/ResponsiveTable"

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
