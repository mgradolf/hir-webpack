import React from "react"
import { useSelector } from "react-redux"
import { Layout as AntdLayout } from "antd"
import { Header, Breadcrumb } from "~/component/layout"
import { AppState } from "~/store"

const { Footer, Content } = AntdLayout

interface ILayoutProps {
  children: React.ReactNode
}

function Layout(props: ILayoutProps) {
  const { location } = useSelector((state: AppState) => state.router)
  return (
    <AntdLayout className="layout">
      <Header />
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb path={location.pathname} />
        {props.children}
      </Content>
      <Footer style={{ textAlign: "center" }}>Jenzbar ©2020 Created by Jenzabar Team</Footer>
    </AntdLayout>
  )
}

export default Layout
