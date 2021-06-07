import { Button, Dropdown, Menu } from "antd"
import React from "react"
import { PlusOutlined } from "@ant-design/icons"
import { DepositFormModalOpenButton } from "~/Component/Feature/Transaction/DepositForm"
import { RefundFormModalOpenButton } from "~/Component/Feature/Transaction/RefundForm"
import { TransferFormModalOpenButton } from "~/Component/Feature/Transaction/TransferForm"

export function TransactionModalOpenButton() {
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <DepositFormModalOpenButton />
      </Menu.Item>
      <Menu.Item key="2">
        <RefundFormModalOpenButton />
      </Menu.Item>
      <Menu.Item key="3">
        <TransferFormModalOpenButton />
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu}>
      <Button icon={<PlusOutlined />} shape="circle" type="primary" />
    </Dropdown>
  )
}
