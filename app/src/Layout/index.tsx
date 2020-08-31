import React from "react"
import { Layout as AntdLayout } from "antd"
import { Header, Breadcrumb } from "~/Component/layout"

const { Footer, Content } = AntdLayout

interface ILayoutProps {
  children: React.ReactNode
}

function Layout(props: ILayoutProps) {
  return (
    <AntdLayout className="layout">
      <Header />
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb />
        {props.children}
      </Content>
      <Footer style={{ textAlign: "center" }}>Jenzbar ©2020 Created by Jenzabar Team</Footer>
    </AntdLayout>
  )
}

export default Layout
