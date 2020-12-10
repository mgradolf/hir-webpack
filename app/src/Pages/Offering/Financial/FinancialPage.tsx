import React, { useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { getFinancialTableColumns } from "~/FormMeta/Financial/FinancialTableColumns"
import StandardPage from "~/Component/Common/Page/StandardPage"
import { Button } from "antd"
import CreateNewOfferingFinancial from "~/Component/Offering/Financial/OfferingFinancialFormModal"
import { REFRESH_OFFERING_FINANCIAL_PAGE } from "~/utils/EventBus"

export default function FinancialPage(props: RouteComponentProps<{ offeringID?: string }>) {
  const OfferingID = Number(props.match.params.offeringID)
  const [showModal, setShowModal] = useState(false)

  return (
    <StandardPage
      blocks={[
        <>
          <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal(true)}>
            + Create Offering Financial
          </Button>
          {showModal && <CreateNewOfferingFinancial offeringID={OfferingID} closeModal={() => setShowModal(false)} />}
        </>
      ]}
      title="Manage Offering Financials"
      tableProps={{ ...getFinancialTableColumns(OfferingID), refreshEventName: REFRESH_OFFERING_FINANCIAL_PAGE }}
      initialFilter={{ OfferingID: OfferingID }}
    />
  )
}
