import React from "react"
import { Menu } from "antd"

import FinancialEditLink from "~/Component/Offering/Financial/FinancialEditLink"
import FinancialRemoveLink from "~/Component/Offering/Financial/FinancialRemoveLink"

interface IFinancialMenu {
  offeringId: number
  financialId: number
}

export default function FinancialMenu(props: IFinancialMenu) {
  return (
    <Menu>
      <Menu.Item key="0">
        <FinancialEditLink offeringId={props.offeringId} financialId={props.financialId} />
      </Menu.Item>
      <Menu.Item key="1">
        <FinancialRemoveLink offeringId={props.offeringId} financialId={props.financialId} />
      </Menu.Item>
    </Menu>
  )
}
