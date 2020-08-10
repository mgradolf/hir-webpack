import * as React from 'react';
import { connect } from 'react-redux'
import moment from 'moment';

import { Layout, Menu, Breadcrumb, Row, Col, Button, Input, Select } from 'antd';
import { Table, Space, Dropdown, Typography, Checkbox, DatePicker } from 'antd';
import { DownOutlined, FilterOutlined, CloseOutlined } from '@ant-design/icons';

import { searchOfferingWrap } from '~/api-wrappers/Service/OfferingServiceWrap';
import styles from "~/pages/Offering/Offering.module.scss";
import {string} from "prop-types";

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;
const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const dateFormat = 'MM/DD/YYYY';

type OfferingState = {
	OfferingCode: string
	OfferingName: string
	ToCreationDate: string
	FromCreationDate: string
	ToTerminationDate: string
	FromTerminationDate: string
	filterCounter: number
	showFilter: boolean
	loading: boolean
	showOfferingCodeBlock: boolean
	showOfferingNameBlock: boolean
	showCreationDateBlock: boolean
	showTerminationDateBlock: boolean
	showIsQuickAdmitBlock: boolean
	offeringItems: any,
	expandedRowKeys: any
}

class OfferingPage extends React.Component<{}, OfferingState> {

	filterCount = 0;
	columns = [
		{
			title: 'Offering Code',
			dataIndex: 'OfferingCode',
			key: 'OfferingCode',
			sorter: (a: any, b: any) => a.OfferingCode.length - b.OfferingCode.length,
		},
		{
			title: 'Offering Name',
			dataIndex: 'OfferingName',
			key: 'OfferingName',
			sorter: (a: any, b: any) => a.OfferingName.length - b.OfferingName.length,
		},
		{
			title: 'Creation Date',
			dataIndex: 'CreationDate',
			key: 'CreationDate',
			render: (text: any)=> text != null ? moment(text).format('YYYY-MM-DD') : ''
		},
		{
			title: 'Termination Date',
			dataIndex: 'TerminationDate',
			key: 'TerminationDate',
			render: (text: any)=> text != null ? moment(text).format('YYYY-MM-DD') : ''
		},
		{
			title: 'Status',
			dataIndex: 'StatusCode',
			key: 'StatusCode',
			sorter: (a: any, b: any) => a.StatusCode.length - b.StatusCode.length,
		},
		{
			title: 'Department',
			dataIndex: 'OrganizationName',
			key: 'OrganizationName'
		},
		{
			title: 'Offering Type',
			dataIndex: 'OfferingTypeName',
			key: 'OfferingTypeName'
		},
		{
			title: 'Def Section',
			dataIndex: 'SectionTypeName',
			key: 'SectionTypeName'
		},
		{
			title: 'Action',
			key: 'action',
			render: (record: any) => (
				<Space size="middle">
					<Dropdown overlay={OfferingPage.generateMenu(record)} trigger={['click']}>
						<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
							Select actions <DownOutlined />
						</a>
					</Dropdown>
				</Space>
			),
		}
	];

	state: OfferingState = {
		OfferingCode: '',
		OfferingName: '',
		ToCreationDate: '',
		FromCreationDate: '',
		ToTerminationDate: '',
		FromTerminationDate: '',
		filterCounter: 0,
		showFilter: false,
		loading: false,
		showOfferingCodeBlock: false,
		showOfferingNameBlock: false,
		showCreationDateBlock: false,
		showTerminationDateBlock: false,
		showIsQuickAdmitBlock: false,
		offeringItems: [],
		expandedRowKeys: []
	};

	static expandableRowRender(data: any) {
		return (
			<div style={{border: "1px solid", padding: "5px"}}>
				<Row>
					<Col span="8" className={styles.fontWeightBold}>
						Description:
					</Col>
					<Col span="16">
						{data.OfferingDescription}
					</Col>
				</Row>
			</div>
		);
	}

	static generateMenu(record: any) {
		return (
			<Menu>
				<Menu.Item key="0">
					<a href={`/offering/${record.OfferingID}/financial`}>Offering Financial</a>
				</Menu.Item>
				<Menu.Item key="1">
					<a href="/">Requisite Management</a>
				</Menu.Item>
				<Menu.Item key="2">
					<a href={`/offering/${record.OfferingID}/catalog`}>Catalogs</a>
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
		);
	}

	async searchOffering() {
		this.setState({
			loading: true
		});

		let params = {
			OfferingCode: this.state.OfferingCode == '' ? '*' : this.state.OfferingCode,
			OfferingName: this.state.OfferingName == '' ? '*' : this.state.OfferingName,
		};

		/*if (this.state.FromCreationDate != '') {
			params["FromCreationDate"] = this.state.FromCreationDate;
		}
		if (this.state.ToCreationDate != '') {
			params["ToCreationDate"] = this.state.ToCreationDate;
		}*/

		const [result, error] = await searchOfferingWrap(params);

		if (result) {
			this.setState({
				loading: false,
				offeringItems: result.data
			})
		}
	}

	async componentDidMount() {
		this.searchOffering();
	}

	handleCreationDateChange = (dateString: any) => {
		if (dateString != null) {
			this.setState({
				FromCreationDate: dateString[0],
				ToCreationDate: dateString[1]
			})
		}
	};

	handleTerminationDateChange = (dateString: any) => {
		if (dateString != null) {
			this.setState({
				FromTerminationDate: dateString[0],
				ToTerminationDate: dateString[1]
			})
		}
	};

	handleInputChange = (event: any) => {
		this.setState({
			[event.target.name]: event.target.value
		} as OfferingState)
	};

	handleSubmit = (event: any) => {
		event.preventDefault();
		this.setState({
			filterCounter: this.filterCount
		});
		this.searchOffering();
	};

	toggleFilter = () => {
		this.setState({
			showFilter: !this.state.showFilter
		})
	};

	toggleOfferingCodeBLock = (event: any) => {
		this.setState({
			showOfferingCodeBlock: !this.state.showOfferingCodeBlock,
			OfferingCode: event.target.checked ? this.state.OfferingCode : "",
		});
		this.filterCounter(event);
	};

	toggleOfferingNameBLock = (event: any) => {
		this.setState({
			showOfferingNameBlock: !this.state.showOfferingNameBlock,
			OfferingName: event.target.checked ? this.state.OfferingName : "",
		});
		this.filterCounter(event);
	};

	toggleCreationDateBLock = (event: any) => {
		this.setState({
			showCreationDateBlock: !this.state.showCreationDateBlock
		});
		this.filterCounter(event);
	};

	toggleTerminationDateBLock = (event: any) => {
		this.setState({
			showTerminationDateBlock: !this.state.showTerminationDateBlock
		});
		this.filterCounter(event);
	};

	toggleIsQuickAdmitBLock = (event: any) => {
		this.setState({
			showIsQuickAdmitBlock: !this.state.showIsQuickAdmitBlock
		});
		this.filterCounter(event);
	};

	filterCounter = (event: any) => {
		this.setState({
			filterCounter: event.target.checked ? this.state.filterCounter + 1 : this.state.filterCounter - 1
		});
		this.filterCount = event.target.checked ? this.state.filterCounter + 1 : this.state.filterCounter - 1;
	};

	render() {
		const { showFilter, offeringItems, loading,
			OfferingName, OfferingCode, FromCreationDate, ToCreationDate, FromTerminationDate, ToTerminationDate,
			showOfferingCodeBlock, showOfferingNameBlock, showCreationDateBlock, showTerminationDateBlock, showIsQuickAdmitBlock } = this.state;

		let fromCreationDate = FromCreationDate != '' ? moment(FromCreationDate, dateFormat) : moment(new Date(), dateFormat);
		let toCreationDate = ToCreationDate != '' ? moment(ToCreationDate, dateFormat) : moment(new Date(), dateFormat);

		let fromTerminationDate = FromTerminationDate != '' ? moment(FromTerminationDate, dateFormat) : moment(new Date(), dateFormat);
		let toTerminationDate = ToTerminationDate != '' ? moment(ToTerminationDate, dateFormat) : moment(new Date(), dateFormat);

		return (
			<Layout className="layout">
				<Header>
					<div>
						<img className={styles.logo} src="./images/logo.png" alt="JE Home Page"/>
					</div>
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
						<Menu.Item key="4" className={styles.floatRight}>
							<a href="/login">Logout</a>
						</Menu.Item>
					</Menu>
				</Header>
				<Content style={{ padding: '0 50px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>
							<a href="/">Home</a>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							<a href="/offering">Offering</a>
						</Breadcrumb.Item>
						<Breadcrumb.Item>Search</Breadcrumb.Item>
					</Breadcrumb>
					<div className="site-layout-content">
						<Row>
							<Title level={3}>Manage Offerings</Title>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className="gutter-row" xs={24} sm={24} md={12}>
								<a href="javascript:void(0)" onClick={this.toggleFilter}>
									<FilterOutlined />
									<span> {this.filterCount == 0 ? 'No' : this.filterCount} filters applied</span>
								</a>
							</Col>
							<Col className={`gutter-row ${styles.textAlignRight}`} xs={24} sm={24} md={12}>
								<Button type="primary" className={showFilter ? styles.hidden : styles.marginRight5px} onClick={this.toggleFilter}>Filters</Button>
								<Button type="primary">+ Create Offering</Button>
							</Col>
						</Row>

						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={styles.paddingTop10px}>
							<Col className={showFilter ? `gutter-row ${styles.offeringFilter}` : styles.hidden}
									 xs={24} sm={24} md={5} >
								<Row>
									<Col span={12}>
										<Title level={4}>Offering Filter</Title>
									</Col>
									<Col span={12} className={styles.padding5px}>
										<a href="javascript:void(0);" onClick={this.toggleFilter}>
											<CloseOutlined style={{fontSize: "20px", color: "black", float: "right"}} />
										</a>
									</Col>
								</Row>
								<Row>
									<Checkbox onChange={this.toggleOfferingCodeBLock}>Offering Code</Checkbox>
									<Row className={showOfferingCodeBlock ? styles.offeringFilterField : styles.hidden}>
										<Input name="OfferingCode" defaultValue="" value={OfferingCode == "*" ? "" : OfferingCode}
													 onChange={this.handleInputChange}/>
									</Row>
								</Row>
								<Row>
									<Checkbox onChange={this.toggleOfferingNameBLock}>Offering Name</Checkbox>
									<Row className={showOfferingNameBlock ? styles.offeringFilterField : styles.hidden}>
										<Input name="OfferingName" defaultValue="" value={OfferingName == "*" ? "" : OfferingName}
													 onChange={this.handleInputChange}/>
									</Row>
								</Row>
								<Row>
									<Checkbox onChange={this.toggleCreationDateBLock}>Creation Date</Checkbox>
									<Row className={showCreationDateBlock ? styles.offeringFilterField : styles.hidden}>
										<RangePicker value={[fromCreationDate, toCreationDate]}
																 onChange={this.handleCreationDateChange} format={dateFormat}/>
									</Row>
								</Row>
								<Row>
									<Checkbox onChange={this.toggleTerminationDateBLock}>Termination Date</Checkbox>
									<Row className={showTerminationDateBlock ? styles.offeringFilterField : styles.hidden}>
										<RangePicker value={[fromTerminationDate, toTerminationDate]}
																 onChange={this.handleTerminationDateChange} format={dateFormat}/>
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
									<Button type="primary" className={styles.applyBtn} onClick={this.handleSubmit}>Apply</Button>
								</Row>
							</Col>
							<Col className={`gutter-row ${styles.offeringDetails}`}
									 xs={24} sm={24} md={{span: showFilter ? 18 : 24, offset: showFilter ? 1 : 0}}>
								<Table
									columns={this.columns}
									dataSource={offeringItems}
									loading={loading}
									bordered
									scroll={{ x: 'fit-content' }}
									expandedRowRender={OfferingPage.expandableRowRender}
									rowKey="OfferingID"
									pagination={{ position: ['topLeft'] }}
								/>
							</Col>
						</Row>
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>Jenzbar ©2020 Created by Jenzabar Team</Footer>
			</Layout>
		)
	}
}

export default OfferingPage;
