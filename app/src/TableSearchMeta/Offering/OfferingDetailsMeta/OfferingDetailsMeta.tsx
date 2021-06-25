import React, { useState } from "react"
import {
  REFRESH_OFFERING_APPROVAL_PAGE,
  REFRESH_OFFERING_CATALOG_PAGE,
  REFRESH_OFFERING_FINANCIAL_PAGE,
  REFRESH_OFFERING_QUALIFIED_INSTRUCTOR_PAGE,
  REFRESH_SECTION_PAGE
} from "~/utils/EventBus"
import { CardContainer, IDetailsSummary } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"

import { renderBoolean, renderDate } from "~/Component/Common/ResponsiveTable"
import { OfferingEditLink } from "~/Component/Feature/Offering/OfferingEditLink"
import { getSectionTableColumns } from "~/TableSearchMeta/Section/SectionTableColumns"
import { SectionFormModal } from "~/Component/Feature/Section/SectionFormModal"
import { getOfferingFinancialTableColumns } from "~/TableSearchMeta/OfferingFinancial/OfferingFinancialTableColumns"
import { getQualifiedInstructorTableColumns } from "~/TableSearchMeta/Offering/QualifiedInstructorTableColumns"
import { AddInstructorButton } from "~/Component/Feature/OfferingQualifiedInstructor/AddInstructorButton"
import { getOfferingCatalogTableColumns } from "~/TableSearchMeta/Offering/OfferingCatalogTableColumns"
import { IDetailsCustomTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsCustomTab"
import RequisitePage from "~/Pages/Manage/Courses/Offering/Requisite/RequisitePage"
import { getOfferingApprovalTableColumns } from "~/TableSearchMeta/OfferingApproval/ApprovalTableColumns"
import OfferingApprovalModalOpenButton from "~/Component/Feature/OfferingApproval/OfferingApprovalModalOpenButton"
import { OfferingRemoveLink } from "~/Component/Feature/Offering/OfferingRemoveLink"
import { getTagsTabPageDetailsMeta } from "~/TableSearchMeta/Tags/TagsTabPageDetailsMeta"
import { FINANCIAL_OFFERING_TYPE_ID, FINANCIAL_TYPE_OFFERING } from "~/utils/Constants"
import CreateNewFinancial from "~/Component/Feature/Financial/FinancialFormModal"
import { getQuestionTaggingTableColumns } from "~/TableSearchMeta/QuestionTagging/QuestionTaggingTableColumn"
import { QuestionTaggingSearchMeta } from "~/TableSearchMeta/QuestionTagging/QuestionTaggingSearchMeta"
import SecondStepForm from "~/Component/Feature/Offering/Forms/SecondStepForm"
import ThirdStepForm from "~/Component/Feature/Offering/Forms/ThirdStepForm"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"
import { OfferingStatusForm } from "~/Component/Feature/Offering/Forms/OfferingStatusForm"
import { InlineForm } from "~/Component/Common/Form/InlineForm"
import { getPaymentGatewayAccounts } from "~/ApiServices/Service/RefLookupService"
import { updateOffering } from "~/ApiServices/Service/OfferingService"
import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"
import "~/Sass/utils.scss"

export const getOfferingDetailsMeta = (offering: { [key: string]: any }): IDetailsMeta => {
  const basicInfo: CardContainer = {
    title: "Basic Info",
    cardActions: [
      <OfferingEditLink component={SecondStepForm} initialValues={offering} />,
      <OfferingRemoveLink OfferingId={offering.OfferingID} HasSection={offering.HasSection} />
    ],
    contents: [
      { label: "Offering Name", value: offering.OfferingName, render: undefined },
      { label: "Description", value: offering.OfferingDescription, render: undefined },
      {
        label: "URL",
        value: offering.URL,
        render: (text: any) => {
          let finalUrl = null
          if (text !== null) {
            if (text.includes("http://") || text.includes("https://")) {
              finalUrl = text
            } else {
              finalUrl = "http://" + text
            }
          }
          return (
            <a href={finalUrl} target={"_blank"} rel="noopener noreferrer">
              {text}
            </a>
          )
        }
      },
      { label: "Creation Date", value: offering.CreationDate, render: renderDate },
      { label: "Creation Term", value: offering.StartTermName, render: undefined },
      { label: "Termination Date", value: offering.TerminationDate, render: renderDate },
      { label: "Termination Term", value: offering.EndTermName, render: undefined }
    ]
  }

  const characteristicsInfo: CardContainer = {
    title: "Core Characteristics",
    cardActions: [<OfferingEditLink component={ThirdStepForm} initialValues={offering} />],
    contents: [
      {
        label: "Status",
        value: <OfferingStatusForm initialValue={offering} />
      },
      { label: "Department", value: offering.OrganizationName, render: undefined },
      { label: "Quick Admit", value: offering.IsQuickAdmit, render: renderBoolean },
      { label: "Approval Process", value: offering.HasApprovalProcess, render: renderBoolean },
      { label: "Inquiry Recipient", value: offering.SubmitInquiryToName, render: undefined },
      {
        label: "Payment Gateway",
        value: (
          <InlineForm
            fieldName="PaymentGatewayAccountID"
            refreshEventName="REFRESH_PAGE"
            inputType="DROPDOWN"
            displayKey="Name"
            valueKey="ID"
            defaultValue={offering.PaymentGatewayAccountID}
            updateFunc={(Params: { [key: string]: any }) =>
              updateOffering({ OfferingID: offering.OfferingID, ...Params })
            }
            refLookupService={getPaymentGatewayAccounts}
          />
        )
      },
      { label: "Default Section Type", value: offering.SectionTypeName, render: undefined }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [basicInfo, characteristicsInfo],
    actions: [<HelpButton helpKey="offeringSummaryTab" />]
  }

  const SectionFormModalOpenButton = (props: { OfferingID: number }) => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        {setShowModal && (
          <IconButton toolTip="Create Section" iconType="create" onClick={() => setShowModal && setShowModal(true)} />
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
          <IconButton toolTip="Create Financial" iconType="create" onClick={() => setShowModal && setShowModal(true)} />
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
    blocks: [
      <FinancialFormModalOpenButton OfferingID={offering.OfferingID} />,
      <HelpButton helpKey="offeringFinancialsTab" />
    ],
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
    blocks: [<HelpButton helpKey="offeringQualifiedInstructorsTab" />],
    blockComponents: [{ component: AddInstructorButton, props: { OfferingID: offering.OfferingID } }],
    tableProps: {
      pagination: false,
      ...getQualifiedInstructorTableColumns(),
      searchParams: { OfferingID: offering.OfferingID },
      refreshEventName: REFRESH_OFFERING_QUALIFIED_INSTRUCTOR_PAGE
    }
  }

  const catalogMeta: IDetailsTableTabProp = {
    blocks: [<HelpButton helpKey="offeringCatalogsTab" />],
    tableProps: {
      pagination: false,
      ...getOfferingCatalogTableColumns(offering.OfferingID),
      searchParams: { OfferingID: offering.OfferingID },
      refreshEventName: REFRESH_OFFERING_CATALOG_PAGE
    }
  }

  const sectionMeta: IDetailsTableTabProp = {
    blocks: [
      <SectionFormModalOpenButton OfferingID={offering.OfferingID} />,
      <HelpButton helpKey="offeringSectionsTab" />
    ],
    tableProps: {
      pagination: false,
      ...getSectionTableColumns(false, offering.OfferingID),
      searchParams: { OfferingID: offering.OfferingID },
      refreshEventName: REFRESH_SECTION_PAGE
    }
  }

  const approvalMeta: IDetailsTableTabProp = {
    blocks: [
      <OfferingApprovalModalOpenButton offeringId={offering.OfferingID} statusCode={offering.StatusCode} />,
      <HelpButton helpKey="offeringApprovalsTab" />
    ],
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
      // tabMeta: [],
      multipleTabMetas: getTagsTabPageDetailsMeta({}, "Offering", offering.OfferingID).tabs
    },
    {
      tabTitle: "Tagged Questions",
      tabType: "searchtable",
      tabMeta: {
        blocks: [<HelpButton helpKey="offeringTaggedQuestionsTab" />],
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
