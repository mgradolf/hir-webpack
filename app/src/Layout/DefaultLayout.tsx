import React, { useState } from "react"
import { Layout, Menu } from "antd"
import { Breadcrumb } from "~/component/layout"
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"
import styles from "~/Layout/DefaultLayout.module.scss"
import { Link } from "react-router-dom"
import { logout } from "~/ApiServices/Login"

// const { Footer, Content } = AntdLayout
const { Header, Sider, Content, Footer } = Layout

interface ILayoutProps {
  children: React.ReactNode
}

export default function DefaultLayout(props: ILayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout>
      <Sider breakpoint="sm" collapsedWidth={0} trigger={null} collapsible collapsed={collapsed}>
        <div className={[styles.expanded, collapsed ? styles.collapsed : null].join(" ")}></div>
        <Menu theme="dark" mode="inline">
          <Menu.SubMenu key="sub1" title="Manage">
            <Menu.Item key="1">
              <Link to="/offering">Offering</Link>
            </Menu.Item>
            <Menu.Item key="2">Person</Menu.Item>
            <Menu.Item key="3">Course</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="sub2" title="Setup">
            <Menu.Item key="5">Organization</Menu.Item>
            <Menu.Item key="6">Reference Data</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="sub3" title="Tools">
            <Menu.Item key="7">Reports</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="7" onClick={logout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <MenuToggle collapsed={collapsed} setCollapsed={setCollapsed} />
        </Header>
        <Content style={{ padding: "0 10px" }}>
          <Breadcrumb />
          {props.children}
        </Content>
        <Footer style={{ textAlign: "center" }}>Jenzbar ©2020 Created by Jenzabar Team</Footer>
      </Layout>
    </Layout>
  )
}

interface IMenuToggle {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

function MenuToggle(props: IMenuToggle) {
  return (
    <>
      {props.collapsed && (
        <MenuUnfoldOutlined
          style={{ fontSize: "30px", paddingLeft: "15px", color: "white" }}
          onClick={() => props.setCollapsed(!props.collapsed)}
        />
      )}
      {!props.collapsed && (
        <MenuFoldOutlined
          style={{ fontSize: "30px", paddingLeft: "15px", color: "white" }}
          onClick={() => props.setCollapsed(!props.collapsed)}
        />
      )}
    </>
  )
}
