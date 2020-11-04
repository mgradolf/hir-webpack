import React from "react"
import { Menu, Dropdown, Button } from "antd"
import { DownOutlined } from "@ant-design/icons"

interface IRegistrationDetailsMenu {
  menu?: any
}

const menu = (
  <Menu>
    <Menu.Item key={1}>Send Email Registration Confirmation</Menu.Item>
    <Menu.Item key={2}>Email Student</Menu.Item>
  </Menu>
)

export default function RequestDetailsMenu(props: IRegistrationDetailsMenu) {
  return (
    <Dropdown overlay={menu}>
      <Button type="primary" onClick={(e) => e.preventDefault()}>
        Go To <DownOutlined />
      </Button>
    </Dropdown>
  )
}
