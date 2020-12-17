import React, { useState } from "react"
import { Button } from "antd"
import { RouteComponentProps } from "react-router-dom"
import StandardPage from "~/Component/Common/Page/StandardPage"
import { getSectionFinancialTableColumns } from "~/FormMeta/SectionFinancial/FinancialTableColumns"
import CreateNewBudget from "~/Component/Section/Budget/BudgetFormModal"

export default function BudgetPage(props: RouteComponentProps<{ sectionID?: string }>) {
  const SectionID = Number(props.match.params.sectionID)
  const [showModal, setShowModal] = useState(false)

  return (
    <StandardPage
      blocks={[
        <>
          <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal(true)}>
            + Create Budget Financials
          </Button>
          {showModal && <CreateNewBudget sectionId={SectionID} closeModal={() => setShowModal(false)} />}
        </>
      ]}
      title="Manage Budgets"
      tableProps={{
        ...getSectionFinancialTableColumns()
      }}
      initialFilter={{ SectionID: SectionID }}
    />
  )
}
