import * as React from "react"

import {
  Breadcrumb as AntdBreadcrumb,
  Layout,
  Menu,
  Row,
  Col,
  Button,
  Input,
  Select,
  Table,
  Space,
  Dropdown,
  Typography,
  Checkbox,
  DatePicker
} from "antd"
import moment from "moment"

import { DownOutlined, CloseOutlined, ReadOutlined } from "@ant-design/icons"
import { Header, Breadcrumb, Toolbar } from "~/component/Offering"
import { searchOfferingWrap } from "~/ApiServices/Service/OfferingServiceWrap"
import { RouteComponentProps, Link } from "react-router-dom"
import styles from "~/pages/Offering/OfferingDetails.module.scss"

const { Content, Footer } = Layout

const { Title, Text } = Typography
const { RangePicker } = DatePicker
const { Option } = Select

const dateFormat = "MM/DD/YYYY"

type OfferingState = {
  OfferingID: number
  OfferingCode: string
  OfferingName: string
  OrganizationName: string
  StatusCode: string
  CreationDate: string
  TerminationDate: string
  loading: boolean
}

class OfferingDetailsPage extends React.Component<RouteComponentProps, OfferingState> {
  state: OfferingState = {
    OfferingID: (this.props.match.params as any).id,
    OfferingCode: "",
    OfferingName: "",
    OrganizationName: "",
    StatusCode: "",
    CreationDate: "",
    TerminationDate: "",
    loading: false
  }

  static generateMenu(record: any) {
    return (
      <Menu>
        <Menu.Item key="0">
          <Link to={`/offering/${record.OfferingID}/financial`}>Offering Financial</Link>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="/">Requisite Management</a>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={`/offering/${record.OfferingID}/catalog`}>Catalogs</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <a href="/">Offering Tag</a>
        </Menu.Item>
        <Menu.Item key="4">
          <a href="/">Offering Approval</a>
        </Menu.Item>
        <Menu.Item key="5">
          <a href="/">Qualified Instructors</a>
        </Menu.Item>
      </Menu>
    )
  }

  async getOffering() {
    this.setState({
      loading: true
    })

    const params = {
      OfferingID: this.state.OfferingID
    }

    const [result] = await searchOfferingWrap(params)

    if (result) {
      this.setState({
        loading: false,
        OfferingCode: result.data[0].OfferingCode,
        OfferingName: result.data[0].OfferingName,
        OrganizationName: result.data[0].OrganizationName,
        StatusCode: result.data[0].StatusCode,
        CreationDate: result.data[0].CreationDate,
        TerminationDate: result.data[0].TerminationDate
      })
    }
  }

  async componentDidMount() {
    this.getOffering()
  }

  render() {
    const { OfferingName, OfferingCode, OrganizationName, StatusCode, CreationDate, TerminationDate } = this.state

    return (
      <Layout className="layout">
        <Header />
        <Content style={{ padding: "0 50px" }}>
          <AntdBreadcrumb style={{ margin: "16px 0" }}>
            <AntdBreadcrumb.Item>
              <a href="/">Home</a>
            </AntdBreadcrumb.Item>
            <AntdBreadcrumb.Item>
              <a href="/offering">Offering</a>
            </AntdBreadcrumb.Item>
            <AntdBreadcrumb.Item>{OfferingCode}</AntdBreadcrumb.Item>
          </AntdBreadcrumb>

          <div className="site-layout-content">
            <Row>
              <Title level={3}>Offering Details</Title>
            </Row>
            <Row>
              <Col span={3}>
                <ReadOutlined style={{ fontSize: "140px" }} />
              </Col>
              <Col span={21} style={{ padding: "10px" }}>
                <Row>
                  <Text style={{ fontSize: "20px" }}>{OfferingCode}</Text>
                </Row>
                <Row>
                  <Text style={{ fontSize: "15px" }}>Name: {OfferingName}</Text>
                </Row>
                <Row>
                  <Text style={{ fontSize: "15px" }}>Organization: {OrganizationName}</Text>
                </Row>
                <Row>
                  <Text style={{ fontSize: "15px" }}>
                    Status: <span style={{ color: "blue" }}>{StatusCode}</span>
                  </Text>
                </Row>
              </Col>
            </Row>
          </div>

          {/*/!*<div className="site-layout-content">
						<Row>
							<Title level={3}>Manage Offerings</Title>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={styles.paddingTop10px}>
							<Col
								className={showFilter ? `gutter-row ${styles.offeringFilter}` : styles.hidden}
								xs={24}
								sm={24}
								md={5}
							>
								<Row>
									<Col span={12}>
										<Title level={4}>Offering Filter</Title>
									</Col>
									<Col span={12} className={styles.padding5px}>
                    <span onClick={this.toggleFilter}>
                      <CloseOutlined style={{ fontSize: "20px", color: "black", float: "right" }} />
                    </span>
									</Col>
								</Row>
								<Row>
									<Checkbox onChange={this.toggleOfferingCodeBLock}>Offering Code</Checkbox>
									<Row className={showOfferingCodeBlock ? styles.offeringFilterField : styles.hidden}>
										<Input
											name="OfferingCode"
											defaultValue=""
											value={OfferingCode === "*" ? "" : OfferingCode}
											onChange={this.handleInputChange}
										/>
									</Row>
								</Row>
								<Row>
									<Checkbox onChange={this.toggleOfferingNameBLock}>Offering Name</Checkbox>
									<Row className={showOfferingNameBlock ? styles.offeringFilterField : styles.hidden}>
										<Input
											name="OfferingName"
											defaultValue=""
											value={OfferingName === "*" ? "" : OfferingName}
											onChange={this.handleInputChange}
										/>
									</Row>
								</Row>
								<Row>
									<Checkbox onChange={this.toggleCreationDateBLock}>Creation Date</Checkbox>
									<Row className={showCreationDateBlock ? styles.offeringFilterField : styles.hidden}>
										<RangePicker
											value={[fromCreationDate, toCreationDate]}
											onChange={this.handleCreationDateChange}
											format={dateFormat}
										/>
									</Row>
								</Row>
								<Row>
									<Checkbox onChange={this.toggleTerminationDateBLock}>Termination Date</Checkbox>
									<Row className={showTerminationDateBlock ? styles.offeringFilterField : styles.hidden}>
										<RangePicker
											value={[fromTerminationDate, toTerminationDate]}
											onChange={this.handleTerminationDateChange}
											format={dateFormat}
										/>
									</Row>
								</Row>
								<Row>
									<Checkbox onChange={this.toggleIsQuickAdmitBLock}>Is QuickAdmit</Checkbox>
									<Row className={showIsQuickAdmitBlock ? styles.offeringFilterField : styles.hidden}>
										<Select defaultValue="1" style={{ width: 200 }}>
											<Option value="1">Yes</Option>
											<Option value="2">No</Option>
										</Select>
									</Row>
								</Row>
								<Row className={styles.floatRight}>
									<Button type="primary" className={styles.applyBtn} onClick={this.handleSubmit}>
										Apply
									</Button>
								</Row>
							</Col>
							<Col
								className={`gutter-row ${styles.offeringDetails}`}
								xs={24}
								sm={24}
								md={{ span: showFilter ? 18 : 24, offset: showFilter ? 1 : 0 }}
							>
								<Table
									columns={this.columns}
									dataSource={offeringItems}
									loading={loading}
									bordered
									expandedRowRender={OfferingPage.expandableRowRender}
									rowKey="OfferingID"
									pagination={{ position: ["topLeft"] }}
									scroll={{ x: "fit-content" }}
								/>
							</Col>
						</Row>
					</div>*!/*/}
        </Content>
        <Footer style={{ textAlign: "center" }}>Jenzbar ©2020 Created by Jenzabar Team</Footer>
      </Layout>
    )
  }
}

export default OfferingDetailsPage
