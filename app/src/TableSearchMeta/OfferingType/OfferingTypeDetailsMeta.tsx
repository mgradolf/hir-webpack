import React from "react"
import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderBoolean } from "~/Component/Common/ResponsiveTable"
import { getSectionTypeTableColumns } from "~/TableSearchMeta/SectionType/SectionTypeTypeTableColumns"

export const getOfferingTypeDetailsMeta = (offering: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      { label: "Type Description", value: offering.OfferingTypeDescription },
      { label: "Offering Name", value: offering.Name },
      { label: "Offering Code", value: offering.OfferingCode },
      { label: "Offering Description", value: offering.Description },
      { label: "Department", value: offering.OrganizationName },
      { label: "Inquiry Recipient", value: offering.SubmitInquiryToUserID },
      { label: "Quick Admit", value: offering.IsQuickAdmit, render: renderBoolean },
      { label: "Add Approval Process", value: offering.HasApprovalProcess, render: renderBoolean },
      { label: "Default Creation By Offering", value: offering.InitOfferingCreationDates, render: renderBoolean },
      { label: "Default Creation Term", value: offering.CreationTermType },
      { label: "Default Creation Time", value: offering.CreationDate },
      { label: "Default Termination Term", value: offering.TerminationTermType },
      { label: "Default Termination Time", value: offering.TerminationDate },
      { label: "URL", value: offering.URL }
    ]
  }

  meta.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      actions: [<HelpButton helpKey="administrationDataOfferingTypesSummaryTab" />],
      summary: [summary]
    }
  })

  meta.push({
    tabTitle: "Section Types",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getSectionTypeTableColumns(),
        searchParams: { OfferingTypeID: offering.OfferingTypeID },
        refreshEventName: "REFRESH_CONTACT_TAB"
      }
    }
  })
  return {
    pageTitle: `${offering.OfferingTypeName}`,
    tabs: meta
  }
}
