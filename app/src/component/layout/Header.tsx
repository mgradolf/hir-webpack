import React from "react"
import { Menu, Layout, Row, Col } from "antd"
import SubMenu from "antd/lib/menu/SubMenu"
import styles from "~/component/layout/Header.module.scss"

const { Header: AntdHeader } = Layout

export function Header() {
  return (
    <AntdHeader>
      <Row>
        <Col xs={2}>
          <img className={styles.logo} src="/images/logo.png" alt="JE Home Page" />
        </Col>
        <Col xs={20}>
          <Menu theme="dark" mode="horizontal">
            <SubMenu key="sub1" title="Manage">
              <Menu.Item key="1">
                <a href="/">Offering</a>
              </Menu.Item>
              <Menu.Item key="2">Person</Menu.Item>
              <Menu.Item key="3">Course</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title="Setup">
              <Menu.Item key="5">Organization</Menu.Item>
              <Menu.Item key="6">Reference Data</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title="Tools">
              <Menu.Item key="7">Reports</Menu.Item>
            </SubMenu>
          </Menu>
        </Col>
      </Row>
    </AntdHeader>
  )
}
