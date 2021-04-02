import React from "react"
import { Menu } from "antd"

import DiscountEditLink from "~/Component/Feature/Section/Discount/DiscountEditLink"
import DiscountRemoveLink from "~/Component/Feature/Section/Discount/DiscountRemoveLink"

interface IBudgetMenu {
  sectionId: number
  sectionDiscountId: number
}

export default function FinancialMenu(props: IBudgetMenu) {
  return (
    <Menu>
      <Menu.Item key="0">
        <DiscountEditLink sectionId={props.sectionId} sectionDiscountId={props.sectionDiscountId} />
      </Menu.Item>
      <Menu.Item key="1">
        <DiscountRemoveLink sectionDiscountId={props.sectionDiscountId} />
      </Menu.Item>
    </Menu>
  )
}
