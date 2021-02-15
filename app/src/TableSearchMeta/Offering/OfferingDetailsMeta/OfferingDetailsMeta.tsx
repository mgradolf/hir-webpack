import React, { useState } from "react"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { renderBoolean, renderDate } from "~/Component/Common/ResponsiveTable"
import OfferingEditLink from "~/Component/Offering/CreateEdit/OfferingEditLink"
import { getSectionTableColumns } from "~/TableSearchMeta/Section/SectionTableColumns"
import SectionFormModal from "~/Component/Section/CreateEdit/SectionFormModal"
import { Button } from "antd"
import { getOfferingFinancialTableColumns } from "~/TableSearchMeta/OfferingFinancial/OfferingFinancialTableColumns"
import { getQualifiedInstructorTableColumns } from "~/TableSearchMeta/Offering/QualifiedInstructorTableColumns"
import { AddInstructorButton } from "~/Component/Offering/QualifiedInstructor/AddInstructorButton"
import { getOfferingCatalogTableColumns } from "~/TableSearchMeta/Offering/OfferingCatalogTableColumns"
import {
  REFRESH_OFFERING_APPROVAL_PAGE,
  REFRESH_OFFERING_CATALOG_PAGE,
  REFRESH_OFFERING_FINANCIAL_PAGE,
  REFRESH_OFFERING_QUALIFIED_INSTRUCTOR_PAGE,
  REFRESH_SECTION_PAGE
} from "~/utils/EventBus"
import { IDetailsCustomTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsCustomTab"
import RequisitePage from "~/Pages/Manage/Courses/Offering/Requisite/RequisitePage"
import { getOfferingApprovalTableColumns } from "~/TableSearchMeta/OfferingApproval/ApprovalTableColumns"
import OfferingApprovalModalOpenButton from "~/Component/Offering/Approval/OfferingApprovalModalOpenButton"
import OfferingRemoveLink from "~/Component/Offering/CreateEdit/OfferingRemoveLink"
import "~/Sass/utils.scss"
import { getTagsTabPageDetailsMeta } from "~/TableSearchMeta/Tags/TagsTabPageDetailsMeta"
import { FINANCIAL_OFFERING_TYPE_ID, FINANCIAL_TYPE_OFFERING } from "~/utils/Constants"
import CreateNewFinancial from "~/Component/Financial/FinancialFormModal"
import { getQuestionTaggingTableColumns } from "~/TableSearchMeta/QuestionTagging/QuestionTaggingTableColumn"
import { QuestionTaggingSearchMeta } from "~/TableSearchMeta/QuestionTagging/QuestionTaggingSearchMeta"

export const getOfferingDetailsMeta = (offering: { [key: string]: any }): IDetailsMeta => {
  const summary: CardContainer = {
    cardActions: [
      <OfferingEditLink OfferingId={offering.OfferingID} />,
      <OfferingRemoveLink OfferingId={offering.OfferingID} />
    ],
    contents: [
      { label: "Offering Name", value: offering.OfferingName, render: undefined },
      { label: "Offering Type", value: offering.OfferingTypeName, render: undefined },

      { label: "Description", value: offering.OfferingDescription, render: undefined },
      { label: "URL", value: offering.URL, render: undefined },
      { label: "Creation Date", value: offering.CreationDate, render: renderDate },
      { label: "Termination Date", value: offering.TerminationDate, render: renderDate },
      { label: "Duration/Term", value: offering.StartTermName, render: undefined },
      { label: "Offering Status ", value: offering.StatusCode, render: undefined },
      { label: "Department", value: offering.OrganizationName, render: undefined },
      { label: "Quick Admit", value: offering.IsQuickAdmit, render: renderBoolean },
      { label: "Approval Process", value: offering.HasApprovalProcess, render: renderBoolean },
      { label: "Inquiry Recipient", value: offering.SubmitInquiryToName, render: undefined },
      { label: "Selected Gateway", value: offering.PaymentGatewayAccountName, render: undefined },
      { label: "Default Section Type", value: offering.SectionTypeName, render: undefined }
    ]
  }
  const summaryMeta: IDetailsSummary = {
    summary: [summary]
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
            + Create Financial
          </Button>
        )}
        {showModal && (
          <CreateNewFinancial
            applyToID={props.OfferingID}
            financialType={FINANCIAL_TYPE_OFFERING}
            closeModal={() => setShowModal(false)}
          />
        )}
      </>
    )
  }

  const financialMeta: IDetailsTableTabProp = {
    blocks: [<FinancialFormModalOpenButton OfferingID={offering.OfferingID} />],
    tableProps: {
      pagination: false,
      ...getOfferingFinancialTableColumns(offering.OfferingID, FINANCIAL_OFFERING_TYPE_ID),
      searchParams: { OfferingID: offering.OfferingID },
      refreshEventName: REFRESH_OFFERING_FINANCIAL_PAGE
    }
  }

  const requisiteMeta: IDetailsCustomTabProp = {
    component: RequisitePage,
    props: { offeringID: offering.OfferingID }
  }

  const qualifiedInstructorMeta: IDetailsTableTabProp = {
    blockComponents: [{ component: AddInstructorButton, props: { OfferingID: offering.OfferingID } }],
    tableProps: {
      pagination: false,
      ...getQualifiedInstructorTableColumns(),
      searchParams: { OfferingID: offering.OfferingID },
      refreshEventName: REFRESH_OFFERING_QUALIFIED_INSTRUCTOR_PAGE
    }
  }

  const catalogMeta: IDetailsTableTabProp = {
    tableProps: {
      pagination: false,
      ...getOfferingCatalogTableColumns(offering.OfferingID),
      searchParams: { OfferingID: offering.OfferingID },
      refreshEventName: REFRESH_OFFERING_CATALOG_PAGE
    }
  }

  const sectionMeta: IDetailsTableTabProp = {
    blocks: [<SectionFormModalOpenButton OfferingID={offering.OfferingID} />],
    tableProps: {
      pagination: false,
      ...getSectionTableColumns(false, offering.OfferingID),
      searchParams: { OfferingID: offering.OfferingID },
      refreshEventName: REFRESH_SECTION_PAGE
    }
  }

  const approvalMeta: IDetailsTableTabProp = {
    blocks: [<OfferingApprovalModalOpenButton offeringId={offering.OfferingID} statusCode={offering.StatusCode} />],
    tableProps: {
      pagination: false,
      ...getOfferingApprovalTableColumns(offering.OfferingID),
      searchParams: { OfferingID: offering.OfferingID },
      refreshEventName: REFRESH_OFFERING_APPROVAL_PAGE
    }
  }

  const tabMetas: IDetailsTabMeta[] = [
    {
      tabTitle: "Summary",
      tabType: "summary",
      tabMeta: summaryMeta
    },
    {
      tabTitle: "Financials",
      tabType: "table",
      tabMeta: financialMeta
    },
    {
      tabTitle: "Requisites",
      tabType: "custom",
      tabMeta: requisiteMeta
    },
    {
      tabTitle: "Qualified Instructors",
      tabType: "table",
      tabMeta: qualifiedInstructorMeta
    },
    {
      tabTitle: "Tags",
      tabType: "summary",
      tabMeta: [],
      multipleTabMetas: getTagsTabPageDetailsMeta({ EntityType: "Offering", EntityID: offering.OfferingID }).tabs
    },
    {
      tabTitle: "Tagged Questions",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: QuestionTaggingSearchMeta,
        defaultFormValue: { OfferingID: offering.OfferingID },
        initialFormValue: { EventID: 2 },
        tableProps: {
          pagination: false,
          ...getQuestionTaggingTableColumns(true),
          searchParams: { OfferingID: offering.OfferingID },
          refreshEventName: "REFRESH_OFFERING_TAGGED_QUESTION"
        }
      }
    },
    {
      tabTitle: "Catalogs",
      tabType: "table",
      tabMeta: catalogMeta
    },
    {
      tabTitle: "Sections",
      tabType: "table",
      tabMeta: sectionMeta
    }
  ]

  if (offering.HasApprovalProcess) {
    tabMetas.push({
      tabTitle: "Approvals",
      tabType: "table",
      tabMeta: approvalMeta
    })
  }

  return {
    pageTitle: `Offering Code - ${offering.OfferingCode}`,
    tabs: tabMetas
  }
}
