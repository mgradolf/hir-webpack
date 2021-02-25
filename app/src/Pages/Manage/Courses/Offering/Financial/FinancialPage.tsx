import React, { useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { getOfferingFinancialTableColumns } from "~/TableSearchMeta/OfferingFinancial/OfferingFinancialTableColumns"
import { Button } from "antd"
import CreateNewFinancial from "~/Component/Financial/FinancialFormModal"
import { REFRESH_OFFERING_FINANCIAL_PAGE } from "~/utils/EventBus"
import { FINANCIAL_OFFERING_TYPE_ID, FINANCIAL_TYPE_OFFERING } from "~/utils/Constants"
import { SearchPage } from "~/Component/Common/Page/SearchPage"

export default function FinancialPage(props: RouteComponentProps<{ offeringID?: string }>) {
  const OfferingID = Number(props.match.params.offeringID)
  const [showModal, setShowModal] = useState(false)

  return (
    <SearchPage
      blocks={[
        <>
          <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal(true)}>
            + Create Offering Financial
          </Button>
          {showModal && (
            <CreateNewFinancial
              applyToID={OfferingID}
              financialType={FINANCIAL_TYPE_OFFERING}
              closeModal={() => setShowModal(false)}
            />
          )}
        </>
      ]}
      title="Manage Offering Financials"
      tableProps={{
        ...getOfferingFinancialTableColumns(OfferingID, FINANCIAL_OFFERING_TYPE_ID),
        refreshEventName: REFRESH_OFFERING_FINANCIAL_PAGE
      }}
      initialFormValue={{ OfferingID: OfferingID }}
    />
  )
}
