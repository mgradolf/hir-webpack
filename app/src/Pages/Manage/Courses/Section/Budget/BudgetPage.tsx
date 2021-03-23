import React, { useState } from "react"
import { Button } from "antd"
import { RouteComponentProps } from "react-router-dom"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getSectionFinancialTableColumns } from "~/TableSearchMeta/SectionFinancial/FinancialTableColumns"
import CreateNewBudget from "~/Component/Feature/Section/Budget/BudgetFormModal"

export default function BudgetPage(props: RouteComponentProps<{ sectionID?: string }>) {
  const SectionID = Number(props.match.params.sectionID)
  const [showModal, setShowModal] = useState(false)

  return (
    <SearchPage
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
      initialFormValue={{ SectionID: SectionID }}
    />
  )
}
