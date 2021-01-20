import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderBoolean } from "~/Component/Common/ResponsiveTable"

export const getOfferingTypeDetailsMeta = (account: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      { label: "Type Description", value: account.OfferingTypeDescription },
      { label: "Offering Name", value: account.Name },
      { label: "Offering Code", value: account.OfferingCode },
      { label: "Offering Description", value: account.Description },
      { label: "Department", value: account.OrganizationName },
      { label: "Inquiry Recipient", value: account.SubmitInquiryToUserID },
      { label: "Quick Admit", value: account.IsQuickAdmit, render: renderBoolean },
      { label: "Add Approval Process", value: account.HasApprovalProcess, render: renderBoolean },
      { label: "Default Creation By Offering", value: account.InitOfferingCreationDates, render: renderBoolean },
      { label: "Default Creation Term", value: account.CreationTermType },
      { label: "Default Creation Time", value: account.CreationDate },
      { label: "Default Termination Term", value: account.TerminationTermType },
      { label: "Default Termination Time", value: account.TerminationDate },
      { label: "URL", value: account.URL }
    ]
  }

  meta.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      summary: [summary]
    }
  })

  //TODO: add section types as tab

  return {
    pageTitle: `${account.OfferingTypeName}`,
    tabs: meta
  }
}
