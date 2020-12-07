import React, { useState } from "react"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { IDetailsSearchTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsSearchTab"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { renderBoolean, renderDate } from "~/Component/Common/ResponsiveTable"
import OfferingEditLink from "~/Component/Offering/CreateEdit/OfferingEditLink"
import OfferingMenu from "~/Component/Offering/OfferingMenu"
import { getSectionTableColumns } from "~/FormMeta/Section/SectionTableColumns"
import SectionFormModal from "~/Component/Section/CreateEdit/SectionFormModal"
import { Button } from "antd"
import { getFinancialTableColumns } from "~/FormMeta/Financial/FinancialTableColumns"
import { getQualifiedInstructorTableColumns } from "~/FormMeta/Instructor/QualifiedInstructorTableColumns"
import CreateNewOfferingFinancial from "~/Component/Offering/Financial/OfferingFinancialFormModal"

export const getOfferingDetailsMeta = (offering: { [key: string]: any }): IDetailsMeta[] => {
  const summary: CardContainer = {
    title: offering.OfferingCode,
    contents: [
      { label: "Offering Name", value: offering.OfferingName, render: undefined },
      { label: "Offering Type", value: offering.OfferingTypeName, render: undefined },
      // { label: "Coordinator(s)", value: offering.coordinators, render: undefined },
      { label: "Description", value: offering.OfferingDescription, render: undefined },
      { label: "URL", value: offering.URL, render: undefined },
      { label: "Creation Date", value: offering.CreationDate, render: renderDate },
      { label: "Termination Date", value: offering.TerminationDate, render: renderDate },
      { label: "Duration/Term", value: offering.StartTermName, render: undefined },
      { label: "Offering Status ", value: offering.StatusCode, render: undefined },
      { label: "Department", value: offering.OrganizationName, render: undefined },
      { label: "Quick Admit", value: offering.IsQuickAdmit, render: renderBoolean },
      { label: "Inquiry Recipient", value: offering.SubmitInquiryToName, render: undefined },
      { label: "Selected Gateway", value: offering.PaymentGatewayAccountName, render: undefined },
      { label: "Default Section Type", value: offering.SectionTypeName, render: undefined }
    ]
  }
  const summaryMeta: IDetailsSummary = {
    summary: [summary],
    editableAction: [<OfferingEditLink OfferingId={offering.OfferingID} PrimaryType={true} />]
  }

  const SectionFormModalOpenButton = (props: { OfferingID: number }) => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        {setShowModal && (
          <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal && setShowModal(true)}>
            + Create Section
          </Button>
        )}
        {showModal && <SectionFormModal OfferingID={props.OfferingID} closeModal={() => setShowModal(false)} />}
      </>
    )
  }

  const FinancialFormModalOpenButton = (props: { OfferingID: number }) => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        {setShowModal && (
          <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal && setShowModal(true)}>
            + Create Offering Financial
          </Button>
        )}
        {showModal && (
          <CreateNewOfferingFinancial offeringID={props.OfferingID} closeModal={() => setShowModal(false)} />
        )}
      </>
    )
  }

  const sectionMeta: IDetailsSearchTabProp = {
    blocks: [<SectionFormModalOpenButton OfferingID={offering.OfferingID} />],
    tableProps: getSectionTableColumns()
  }

  const financialMeta: IDetailsSearchTabProp = {
    blocks: [<FinancialFormModalOpenButton OfferingID={offering.OfferingID} />],
    defaultFilter: { OfferingID: offering.OfferingID },
    tableProps: getFinancialTableColumns(offering.OfferingID)
  }

  const qualifiedInstructorMeta: IDetailsSearchTabProp = {
    defaultFilter: { OfferingID: offering.OfferingID },
    tableProps: getQualifiedInstructorTableColumns(offering.OfferingID)
  }

  return [
    {
      title: "Summary",
      type: "summary",
      meta: summaryMeta
    },
    {
      title: "Financials",
      type: "searchtable",
      meta: financialMeta
    },
    {
      title: "Qualified Instructors",
      type: "searchtable",
      meta: qualifiedInstructorMeta
    },
    {
      title: "Sections",
      type: "searchtable",
      meta: sectionMeta
    }
  ]
}
