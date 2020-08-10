import * as React from 'react';
import {connect} from 'react-redux'
import { RouteComponentProps } from 'react-router';
import moment from 'moment';

import {Layout, Menu, Breadcrumb, Row, Col, Switch, Checkbox} from 'antd';
import {Table, Typography} from 'antd';
import {DownOutlined, FilterOutlined, CloseOutlined} from '@ant-design/icons';

import { findCatalogWrap } from '~/ApiServices/BizApi/catalog/catalogIf';
import { addOrRemoveOfferingToCatalogWrap } from '~/api-wrappers/Service/OfferingServiceWrap';
import styles from "~/pages/Offering/Financial/Financial.module.scss";

const {Header, Content, Footer} = Layout;
const {SubMenu} = Menu;
const {Title} = Typography;

type OfferingCatalogState = {
	offeringID: number
	loading: boolean
	offeringCatalogItems: any
	selectedRowKeys: any
}

class OfferingCatalogPage extends React.Component<{} & RouteComponentProps, OfferingCatalogState> {

	columns = [
		{
			title: 'Catalog Name',
			dataIndex: 'catalogName'
		},
		{
			title: 'Start Date',
			dataIndex: 'startDate',
			render: (text: any)=> text != null ? moment(text).format('YYYY-MM-DD') : ''
		},
		{
			title: 'End Date',
			dataIndex: 'endDate',
			render: (text: any)=> text != null ? moment(text).format('YYYY-MM-DD') : ''
		},
		{
			title: 'Current Status',
			dataIndex: 'currentStatus'
		},
		{
			title: 'Published',
			dataIndex: 'isPublished',
			render: (text: any, record: any)=> <Switch checked={text} onChange={(e) => this.catalogPublished(e, record.catalogID)}/>
		}
	];

	state: OfferingCatalogState = {
		offeringID: (this.props.match.params as any).id,
		loading: false,
		offeringCatalogItems: [],
		selectedRowKeys: []
	};

	async catalogPublished(event: any, catalogID: any) {
		let publishedRowData = this.state.selectedRowKeys;
		if (event) {
			publishedRowData.push(catalogID);
		} else {
			let index = publishedRowData.indexOf(catalogID);
			publishedRowData.splice(index, 1);
		}

		this.setState({
			loading: true
		});
		const [result, error] = await addOrRemoveOfferingToCatalogWrap(this.state.offeringID, publishedRowData);

		if (result) {
			this.setState({
				loading: false,
			});

			this.searchOfferingCatalog();
		}
	};

	async searchOfferingCatalog() {
		this.setState({
			loading: true
		});

		const [result, error] = await findCatalogWrap([{ OfferingID: this.state.offeringID}]);

		if (result) {
			let publishedRowData = [];
			for (let i=0; i<result.data.length; i++) {
				if (result.data[i].isPublished) {
					publishedRowData.push(result.data[i].catalogID);
				}
			}

			this.setState({
				loading: false,
				offeringCatalogItems: result.data,
				selectedRowKeys: publishedRowData
			});
		}
	}

	async componentDidMount() {
		this.searchOfferingCatalog();
	}

	render() {
		const { loading, offeringCatalogItems, offeringID } = this.state;

		return (
			<Layout className="layout">
				<Header>
					<div>
						<img className={styles.logo} src="../../images/logo.png"/>
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
						<Breadcrumb.Item>{offeringID}</Breadcrumb.Item>
						<Breadcrumb.Item>Catalog</Breadcrumb.Item>
					</Breadcrumb>
					<div className="site-layout-content">
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className="gutter-row" xs={24} sm={24} md={24}>
								<Title level={3}>Manage Offering Catalogs</Title>
							</Col>
						</Row>

						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={styles.paddingTop10px}>
							<Col className={`gutter-row ${styles.offeringFinancialDetails}`} xs={24} sm={24} md={24}>
								<Table
									columns={this.columns}
									dataSource={offeringCatalogItems}
									loading={loading}
									bordered
									rowKey="catalogID"
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

export default OfferingCatalogPage;
