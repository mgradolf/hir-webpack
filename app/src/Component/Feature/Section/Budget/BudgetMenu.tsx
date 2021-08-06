import React from "react"
import { BudgetEditLink } from "~/Component/Feature/Section/Budget/BudgetEditLink"
import { BudgetRemoveLink } from "~/Component/Feature/Section/Budget/BudgetRemoveLink"

interface IBudgetMenu {
  sectionId: number
  financialId: number
  seatGroups: Array<any>
  sectionFinancialId: number
  helpKey?: string
}

export default function FinancialMenu(props: IBudgetMenu) {
  return (
    <>
      <BudgetEditLink
        sectionId={props.sectionId}
        seatGroups={props.seatGroups}
        financialId={props.financialId}
        helpKey={props.helpKey}
      />
      <BudgetRemoveLink sectionFinancialId={props.sectionFinancialId} />
    </>
  )
}
