import React from "react"
import { Button, Dropdown, Menu } from "antd"
import { Link } from "react-router-dom"
import { DownOutlined } from "@ant-design/icons"

interface IGoToMenu {
  menuList: Array<{ title: string; url: string }>
}

export default function GoToMenu(props: IGoToMenu) {
  return (
    <Dropdown
      overlay={
        <Menu>
          {props.menuList.map((x, i) => (
            <Menu.Item key={i}>
              <Link to={x.url}>{x.title}</Link>
            </Menu.Item>
          ))}
        </Menu>
      }
      trigger={["click"]}
    >
      <Button type="primary" onClick={(e) => e.preventDefault()}>
        Go To <DownOutlined />
      </Button>
    </Dropdown>
  )
}
