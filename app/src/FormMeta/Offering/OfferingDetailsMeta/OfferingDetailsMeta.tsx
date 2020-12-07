import React, { useState } from "react"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { IDetailsSearchTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsSearchTab"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { renderBoolean, renderDate } from "~/Component/Common/ResponsiveTable"
import OfferingEditLink from "~/Component/Offering/CreateEdit/OfferingEditLink"
import OfferingMenu from "~/Component/Offering/OfferingMenu"
import { SectionSearchMeta } from "~/FormMeta/Section/SectionSearchMeta"
import { getSectionTableColumns } from "~/FormMeta/Section/SectionTableColumns"
import SectionFormModal from "~/Component/Section/CreateEdit/SectionFormModal"
import { Button } from "antd"

export const getOfferingDetailsMeta = (offering: { [key: string]: any }): IDetailsMeta[] => {
  const summary: CardContainer = {
    title: offering.OfferingCode,
    contents: [
      { label: "Name", value: offering.OfferingName, render: undefined },
      { label: "Type", value: offering.OfferingTypeName, render: undefined },
      { label: "Section Type", value: offering.SectionTypeName, render: undefined },
      { label: "Description", value: offering.OfferingDescription, render: undefined },
      { label: "Effective Creation Date", value: offering.EffectiveCreationDate, render: renderDate },
      { label: "Effective Termination Date", value: offering.EffectiveTerminationDate, render: renderDate },
      { label: "OrganizationName", value: offering.OrganizationName, render: undefined },
      { label: "Status ", value: offering.StatusCode, render: undefined },
      { label: "Approval Process ", value: offering.HasApprovalProcess, render: renderBoolean },
      { label: "Quick Admit", value: offering.IsQuickAdmit, render: renderBoolean },
      { label: "Submit Inquiry To User", value: offering.SubmitInquiryToUserID, render: undefined },
      { label: "Modifie Date", value: offering.ModifiedDate, render: renderDate },
      { label: "Modified By", value: offering.ModifiedByUserID, render: undefined }
    ]
  }
  const summaryMeta: IDetailsSummary = {
    summary: [summary],
    actions: [
      <OfferingMenu offering={offering} />,
      <OfferingEditLink OfferingId={offering.OfferingID} PrimaryType={true} />
    ]
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
  const sectionMeta: IDetailsSearchTabProp = {
    blocks: [<SectionFormModalOpenButton OfferingID={offering.OfferingID} />],
    title: "Sections",
    meta: SectionSearchMeta,
    defaultFilter: { OfferingID: offering.OfferingID },
    tableProps: getSectionTableColumns()
  }

  return [
    {
      title: "Summary",
      type: "summary",
      meta: summaryMeta
    },
    {
      title: "Section",
      type: "searchtable",
      meta: sectionMeta
    }
  ]
}
