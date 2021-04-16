import React from "react"
import { BudgetEditLink } from "~/Component/Feature/Section/Budget/BudgetEditLink"
import { BudgetRemoveLink } from "~/Component/Feature/Section/Budget/BudgetRemoveLink"

interface IBudgetMenu {
  sectionId: number
  financialId: number
  seatGroups: Array<any>
  sectionFinancialId: number
}

export default function FinancialMenu(props: IBudgetMenu) {
  return (
    <>
      <BudgetEditLink sectionId={props.sectionId} seatGroups={props.seatGroups} financialId={props.financialId} />
      <BudgetRemoveLink sectionFinancialId={props.sectionFinancialId} />
    </>
  )
}
