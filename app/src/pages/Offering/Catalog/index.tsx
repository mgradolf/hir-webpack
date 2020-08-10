import * as React from "react"
import { RouteComponentProps } from "react-router"
import { logout } from "~/ApiServices/Login"
import { Layout, Menu, Breadcrumb, Row, Col, Button, Table, Typography } from "antd"
import { searchOfferingFinancialWrap } from "~/ApiServices/Service/OfferingServiceWrap"
import styles from "~/pages/Offering/Financial/Financial.module.scss"

const { Header, Content, Footer } = Layout
const { SubMenu } = Menu
const { Title } = Typography

type OfferingCatalogState = {
  offeringID: number
  loading: boolean
  offeringCatalogItems: any
}

class OfferingCatalogPage extends React.Component<RouteComponentProps, OfferingCatalogState> {
  columns = [
    {
      title: "Description",
      dataIndex: "Description"
    },
    {
      title: "Category",
      dataIndex: ""
    },
    {
      title: "Basis",
      dataIndex: ""
    },
    {
      title: "Amount",
      dataIndex: "ItemUnitAmount"
    },
    {
      title: "Type",
      dataIndex: ""
    },
    {
      title: "Optional?",
      dataIndex: "IsOptional",
      render: (value: boolean) => (value ? "Yes" : "No")
    },
    {
      title: "Taxable?",
      dataIndex: "IsTaxable",
      render: (value: boolean) => (value ? "Yes" : "No")
    },
    {
      title: "Weight",
      dataIndex: "Weight"
    },
    {
      title: "Active",
      dataIndex: "IsActive",
      render: (value: boolean) => (value ? "Yes" : "No")
    },
    {
      title: "GL Account",
      dataIndex: ""
    }
  ]

  state: OfferingCatalogState = {
    offeringID: (this.props.match.params as any).id,
    loading: false,
    offeringCatalogItems: []
  }

  async searchOfferingFinancial() {
    this.setState({
      loading: true
    })

    const [result, error] = await searchOfferingFinancialWrap(this.state.offeringID)

    if (result) {
      this.setState({
        loading: false,
        offeringCatalogItems: result.data
      })
    }
  }

  async componentDidMount() {
    this.searchOfferingFinancial()
  }

  render() {
    const { loading, offeringCatalogItems, offeringID } = this.state

    return (
      <Layout className="layout">
        <Header>
          <div>
            <img className={styles.logo} src="../../images/logo.png" alt="logo" />
          </div>
          <Menu theme="dark" mode="horizontal">
            <SubMenu key="sub1" title="Manage">
              <Menu.Item key="1">
                <a href="/offering">Offering</a>
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
            <Menu.Item key="4" className={styles.floatRight}>
              <span onClick={logout}>Logout</span>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Offering</Breadcrumb.Item>
            <Breadcrumb.Item>{offeringID}</Breadcrumb.Item>
            <Breadcrumb.Item>Financial</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-row" xs={24} sm={24} md={12}>
                <Title level={3}>Manage Offering Financial</Title>
              </Col>
              <Col className={`gutter-row ${styles.textAlignRight}`} xs={24} sm={24} md={12}>
                <Button type="primary">+ Create Offering Financial</Button>
              </Col>
            </Row>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={styles.paddingTop10px}>
              <Col className={`gutter-row ${styles.offeringFinancialDetails}`} xs={24} sm={24} md={24}>
                <Table
                  columns={this.columns}
                  dataSource={offeringCatalogItems}
                  loading={loading}
                  bordered
                  pagination={{ position: ["topLeft"] }}
                />
              </Col>
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Jenzbar ©2020 Created by Jenzabar Team</Footer>
      </Layout>
    )
  }
}

export default OfferingCatalogPage
