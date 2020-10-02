import React from "react"
import { Menu } from "antd"

import BudgetEditLink from "~/Component/Section/Budget/BudgetEditLink"
import BudgetRemoveLink from "~/Component/Section/Budget/BudgetRemoveLink"

interface IBudgetMenu {
  sectionId: number
  seatGroups: Array<any>
  sectionFinancialId: number
}

export default function FinancialMenu(props: IBudgetMenu) {
  return (
    <Menu>
      <Menu.Item key="0">
        <BudgetEditLink
          sectionId={props.sectionId}
          seatGroups={props.seatGroups}
          sectionFinancialId={props.sectionFinancialId} />
      </Menu.Item>
      <Menu.Item key="1">
        <BudgetRemoveLink sectionFinancialId={props.sectionFinancialId} />
      </Menu.Item>
    </Menu>
  )
}
