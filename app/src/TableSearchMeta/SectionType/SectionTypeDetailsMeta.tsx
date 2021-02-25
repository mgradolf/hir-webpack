import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderBoolean } from "~/Component/Common/ResponsiveTable"
import { getStudentEmailTableColumns } from "~/TableSearchMeta/StudentEmail/StudentEmailTableColumns"

export const getSectionTypeDetailsMeta = (record: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      { label: "Type Name", value: record.SectionTypeName },
      { label: "Type Description", value: record.SectionTypeDescription },
      { label: "Section Description", value: record.Description },
      { label: "Default Creation By Section", value: record.InitSectionCreationDates, render: renderBoolean },
      { label: "Default Creation Term", value: record.CreationTermType },
      { label: "Default Creation Time", value: record.CreationDate },
      { label: "Default Termination Term", value: record.TerminationTermType },
      { label: "Default Termination Time", value: record.TerminationDate },
      { label: "Min Enrollment", value: record.MinEnrollment },
      { label: "Max Enrollment", value: record.MaxEnrollment },
      { label: "Credit Type", value: record.CreditType },
      { label: "Grade Scale Type", value: record.GradeScaleType },
      { label: "Fiscal Period", value: record.FiscalPeriod },
      { label: "URL", value: record.URL },
      { label: "Email", value: record.Email },
      { label: "Distance Learning", value: record.IsDistanceLearning, render: renderBoolean },
      { label: "Default Room", value: record.RoomName },
      { label: "Default Inquiry Recipient", value: record.SubmitInquiryToUserID }
    ]
  }

  meta.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      summary: [summary]
    }
  })

  meta.push({
    tabTitle: "Email Notifications",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getStudentEmailTableColumns(),
        searchParams: { SectionID: record.SectionID },
        refreshEventName: "REFRESH_CONTACT_TAB"
      }
    }
  })
  return {
    pageTitle: `${record.SectionTypeName}`,
    tabs: meta
  }
}
