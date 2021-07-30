import React, { useState } from "react"
import { CardContainer, IDetailsSummary } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import { renderBoolean } from "~/Component/Common/ResponsiveTable"
import { FINANCIAL_RESOURCE_TYPE_ID, FINANCIAL_TYPE_RESOURCE } from "~/utils/Constants"
import { getFinancialTableColumns } from "~/TableSearchMeta/Financial/FinancialTableColumns"
import CreateNewFinancial from "~/Component/Feature/Financial/FinancialFormModal"
import { REFRESH_RESOURCE_OFFERINGS_TAB } from "~/utils/EventBus"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"

export const getResourceDetailsMeta = (Resource: { [key: string]: any }): IDetailsMeta => {
  const summary: CardContainer = {
    title: Resource.Name,
    contents: [
      { label: "Resource Type", value: Resource.ResourceType },
      { label: "Is Active", value: Resource.IsActive, render: renderBoolean }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [summary]
  }

  const FinancialFormModalOpenButton = (props: { ResourceID: number }) => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        {setShowModal && (
          <IconButton
            toolTip={"Add Resource Financial"}
            iconType="create"
            onClick={() => setShowModal && setShowModal(true)}
          />
        )}
        {showModal && (
          <CreateNewFinancial
            applyToID={props.ResourceID}
            financialType={FINANCIAL_TYPE_RESOURCE}
            closeModal={() => setShowModal(false)}
          />
        )}
      </>
    )
  }

  const resourceFinancialMeta: IDetailsTableTabProp = {
    blocks: [<FinancialFormModalOpenButton ResourceID={Resource.ResourceID} />],
    tableProps: {
      pagination: false,
      ...getFinancialTableColumns(Resource.ResourceID, FINANCIAL_RESOURCE_TYPE_ID),
      searchParams: { ResourceID: Resource.ResourceID },
      refreshEventName: REFRESH_RESOURCE_OFFERINGS_TAB
    }
  }

  return {
    pageTitle: `Resource - ${Resource.Name}`,
    tabs: [
      {
        tabTitle: "Summary",
        tabType: "summary",
        tabMeta: summaryMeta
      },
      {
        tabTitle: "Financials",
        tabType: "table",
        tabMeta: resourceFinancialMeta
      }
    ]
  }
}
