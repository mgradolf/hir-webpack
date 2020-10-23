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
        <Menu.SubMenu key="1" title="Manage">
          <Menu.Item key="1.1">
            <Link to="/offering">Offerings</Link>
          </Menu.Item>
          <Menu.Item key="1.2">
            <Link to="/section">Sections</Link>
          </Menu.Item>
          <Menu.SubMenu key="1.3" title="Financials">
            <Menu.Item key="1.3.1">
              <Link to="/order">Orders</Link>
            </Menu.Item>
            <Menu.Item key="1.3.2">
              <Link to="/order/items">Items</Link>
            </Menu.Item>
            <Menu.Item key="1.3.3">
              <Link to="/order/payments">Payments</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="1.4">
            <Link to="/waitlist">Waitlist</Link>
          </Menu.Item>
          <Menu.Item key="1.5">
            <Link to="/catalog">Catalog</Link>
          </Menu.Item>
          <Menu.Item key="1.6">
            <Link to="/product">Product</Link>
          </Menu.Item>
          <Menu.SubMenu key="1.7" title="Question">
            <Menu.Item key="1.7.1">
              <Link to="/question">Bank</Link>
            </Menu.Item>
            <Menu.Item key="1.7.2">
              <Link to="/question/tagging">Tagging</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="1.8">
            <Link to="/requests">Requests</Link>
          </Menu.Item>
          <Menu.Item key="1.6">
            <Link to="/registrations">Registrations</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="2" onClick={logout}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  )
}
