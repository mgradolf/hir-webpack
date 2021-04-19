import React from "react"
import DiscountEditLink from "~/Component/Feature/Section/Discount/DiscountEditLink"
import DiscountRemoveLink from "~/Component/Feature/Section/Discount/DiscountRemoveLink"

interface IBudgetMenu {
  sectionId: number
  sectionDiscountId: number
}

export default function FinancialMenu(props: IBudgetMenu) {
  return (
    <>
      <DiscountEditLink sectionId={props.sectionId} sectionDiscountId={props.sectionDiscountId} />
      <DiscountRemoveLink sectionDiscountId={props.sectionDiscountId} />
    </>
  )
}
