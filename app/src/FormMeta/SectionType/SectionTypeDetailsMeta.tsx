import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderBoolean } from "~/Component/Common/ResponsiveTable"

export const getSectionTypeDetailsMeta = (account: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      { label: "Type Name", value: account.SectionTypeName },
      { label: "Type Description", value: account.SectionTypeDescription },
      { label: "Section Description", value: account.Description },
      { label: "Default Creation By Section", value: account.InitSectionCreationDates, render: renderBoolean },
      { label: "Default Creation Term", value: account.CreationTermType },
      { label: "Default Creation Time", value: account.CreationDate },
      { label: "Default Termination Term", value: account.TerminationTermType },
      { label: "Default Termination Time", value: account.TerminationDate },
      { label: "Min Enrollment", value: account.MinEnrollment },
      { label: "Max Enrollment", value: account.MaxEnrollment },
      { label: "Credit Type", value: account.CreditType },
      { label: "Grade Scale Type", value: account.GradeScaleType },
      { label: "Fiscal Period", value: account.FiscalPeriod },
      { label: "URL", value: account.URL },
      { label: "Email", value: account.Email },
      { label: "Distance Learning", value: account.IsDistanceLearning, render: renderBoolean },
      { label: "Default Room", value: account.RoomName },
      { label: "Default Inquiry Recipient", value: account.SubmitInquiryToUserID }
    ]
  }

  //TODO: add tab for "Email Notifications"
  meta.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      summary: [summary]
    }
  })
  return {
    pageTitle: `${account.SectionTypeName}`,
    tabs: meta
  }
}
