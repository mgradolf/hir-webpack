import React, { useState } from "react"
import { CardContainer, IDetailsSummary } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/Common"

import { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import { renderBoolean, renderDate } from "~/Component/Common/ResponsiveTable"
import { FINANCIAL_MARKETING_PROGRAM_TYPE_ID, FINANCIAL_TYPE_MARKETING_PROGRAM } from "~/utils/Constants"
import { getFinancialTableColumns } from "~/TableSearchMeta/Financial/FinancialTableColumns"
import { Button } from "antd"
import CreateNewFinancial from "~/Component/Feature/Financial/FinancialFormModal"
import { REFRESH_MAREKTING_PROGRAM_OFFERINGS_TAB } from "~/utils/EventBus"

export const getMarketingProgramDetailsMeta = (MarketingProgram: { [key: string]: any }): IDetailsMeta => {
  const summary: CardContainer = {
    title: MarketingProgram.MarketSource,
    contents: [
      { label: "Start Date", value: MarketingProgram.StartDate, render: renderDate },
      { label: "End Date", value: MarketingProgram.EndDate, render: renderDate },
      { label: "Is Active", value: MarketingProgram.IsActive, render: renderBoolean }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [summary]
  }

  const FinancialFormModalOpenButton = (props: { MarketingProgramID: number }) => {
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
            applyToID={props.MarketingProgramID}
            financialType={FINANCIAL_TYPE_MARKETING_PROGRAM}
            closeModal={() => setShowModal(false)}
          />
        )}
      </>
    )
  }

  const financialMeta: IDetailsTableTabProp = {
    blocks: [<FinancialFormModalOpenButton MarketingProgramID={MarketingProgram.MarketingProgramID} />],
    tableProps: {
      pagination: false,
      ...getFinancialTableColumns(MarketingProgram.MarketingProgramID, FINANCIAL_MARKETING_PROGRAM_TYPE_ID),
      searchParams: { MarketingProgramID: MarketingProgram.MarketingProgramID },
      refreshEventName: REFRESH_MAREKTING_PROGRAM_OFFERINGS_TAB
    }
  }

  return {
    pageTitle: `Marketing Programs - ${MarketingProgram.MarketSource}`,
    tabs: [
      {
        tabTitle: "Summary",
        tabType: "summary",
        tabMeta: summaryMeta
      },
      {
        tabTitle: "Financials",
        tabType: "table",
        tabMeta: financialMeta
      }
    ]
  }
}
