import React from "react"
import Menu from "antd/lib/menu"
import { Layout } from "antd"
import { Link } from "react-router-dom"
import { logout } from "~/ApiServices/Login"
import styles from "~/Layout/DefaultLayout.module.scss"

const { Sider } = Layout

interface ISidebar {
  collapsed: boolean
}
export default function Sidebar(props: ISidebar) {
  return (
    <Sider
      style={{ minHeight: "100vh" }}
      breakpoint="xs"
      collapsedWidth={0}
      trigger={null}
      collapsible
      collapsed={props.collapsed}
    >
      <div className={[styles.expanded, props.collapsed ? styles.collapsed : null].join(" ")}></div>
      <Menu theme="dark" mode="inline">
        <Menu.SubMenu key="sub1" title="Manage">
          <Menu.Item key="1">
            <Link to="/offering">Offering</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/section">Sections</Link>
          </Menu.Item>
          <Menu.SubMenu key="sub12" title="Financials">
            <Menu.Item key="sub122">
              <Link to="/order">Orders</Link>
            </Menu.Item>
            <Menu.Item key="sub123">
              <Link to="/order/items">Items</Link>
            </Menu.Item>
            <Menu.Item key="sub124">
              <Link to="/order/payments">Payments</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu.SubMenu>
        {/* <Menu.SubMenu key="sub2" title="Setup">
          <Menu.Item key="5">Organization</Menu.Item>
          <Menu.Item key="6">Reference Data</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub3" title="Tools">
          <Menu.Item key="7">Reports</Menu.Item>
        </Menu.SubMenu> */}
        <Menu.Item key="8" onClick={logout}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  )
}
