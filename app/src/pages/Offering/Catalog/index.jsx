"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var React = require('react');
var antd_1 = require('antd');
var antd_2 = require('antd');
var OfferingServiceWrap_1 = require('~/api-wrappers/Service/OfferingServiceWrap');
var Financial_module_scss_1 = require("~/pages/Offering/Financial/Financial.module.scss");
var Header = antd_1.Layout.Header, Content = antd_1.Layout.Content, Footer = antd_1.Layout.Footer;
var SubMenu = antd_1.Menu.SubMenu;
var Title = antd_2.Typography.Title;
var OfferingCatalogPage = (function (_super) {
    __extends(OfferingCatalogPage, _super);
    function OfferingCatalogPage() {
        _super.apply(this, arguments);
        this.columns = [
            {
                title: 'Description',
                dataIndex: 'Description'
            },
            {
                title: 'Category',
                dataIndex: ''
            },
            {
                title: 'Basis',
                dataIndex: ''
            },
            {
                title: 'Amount',
                dataIndex: 'ItemUnitAmount'
            },
            {
                title: 'Type',
                dataIndex: ''
            },
            {
                title: 'Optional?',
                dataIndex: 'IsOptional',
                render: function (value) { return value ? 'Yes' : 'No'; }
            },
            {
                title: 'Taxable?',
                dataIndex: 'IsTaxable',
                render: function (value) { return value ? 'Yes' : 'No'; }
            },
            {
                title: 'Weight',
                dataIndex: 'Weight'
            },
            {
                title: 'Active',
                dataIndex: 'IsActive',
                render: function (value) { return value ? 'Yes' : 'No'; }
            },
            {
                title: 'GL Account',
                dataIndex: ''
            }
        ];
        this.state = {
            offeringID: this.props.match.params.id,
            loading: false,
            offeringCatalogItems: []
        };
    }
    OfferingCatalogPage.prototype.searchOfferingFinancial = function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.setState({
                loading: true
            });
            var _a = yield OfferingServiceWrap_1.searchOfferingFinancialWrap(this.state.offeringID), result = _a[0], error = _a[1];
            if (result) {
                this.setState({
                    loading: false,
                    offeringCatalogItems: result.data
                });
            }
        });
    };
    OfferingCatalogPage.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.searchOfferingFinancial();
        });
    };
    OfferingCatalogPage.prototype.render = function () {
        var _a = this.state, loading = _a.loading, offeringCatalogItems = _a.offeringCatalogItems, offeringID = _a.offeringID;
        return (<antd_1.Layout className="layout">
				<Header>
					<div>
						<img className={Financial_module_scss_1.default.logo} src="../../images/logo.png"/>
					</div>
					<antd_1.Menu theme="dark" mode="horizontal">
						<SubMenu key="sub1" title="Manage">
							<antd_1.Menu.Item key="1">
								<a href="/offering">Offering</a>
							</antd_1.Menu.Item>
							<antd_1.Menu.Item key="2">Person</antd_1.Menu.Item>
							<antd_1.Menu.Item key="3">Course</antd_1.Menu.Item>
						</SubMenu>
						<SubMenu key="sub2" title="Setup">
							<antd_1.Menu.Item key="5">Organization</antd_1.Menu.Item>
							<antd_1.Menu.Item key="6">Reference Data</antd_1.Menu.Item>
						</SubMenu>
						<SubMenu key="sub3" title="Tools">
							<antd_1.Menu.Item key="7">Reports</antd_1.Menu.Item>
						</SubMenu>
						<antd_1.Menu.Item key="4" className={Financial_module_scss_1.default.floatRight}>
							<a href="/login">Logout</a>
						</antd_1.Menu.Item>
					</antd_1.Menu>
				</Header>
				<Content style={{ padding: '0 50px' }}>
					<antd_1.Breadcrumb style={{ margin: '16px 0' }}>
						<antd_1.Breadcrumb.Item>Home</antd_1.Breadcrumb.Item>
						<antd_1.Breadcrumb.Item>Offering</antd_1.Breadcrumb.Item>
						<antd_1.Breadcrumb.Item>{offeringID}</antd_1.Breadcrumb.Item>
						<antd_1.Breadcrumb.Item>Financial</antd_1.Breadcrumb.Item>
					</antd_1.Breadcrumb>
					<div className="site-layout-content">
						<antd_1.Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<antd_1.Col className="gutter-row" xs={24} sm={24} md={12}>
								<Title level={3}>Manage Offering Financial</Title>
							</antd_1.Col>
							<antd_1.Col className={"gutter-row " + Financial_module_scss_1.default.textAlignRight} xs={24} sm={24} md={12}>
								<antd_1.Button type="primary">+ Create Offering Financial</antd_1.Button>
							</antd_1.Col>
						</antd_1.Row>

						<antd_1.Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={Financial_module_scss_1.default.paddingTop10px}>
							<antd_1.Col className={"gutter-row " + Financial_module_scss_1.default.offeringFinancialDetails} xs={24} sm={24} md={24}>
								<antd_2.Table columns={this.columns} dataSource={offeringCatalogItems} loading={loading} bordered pagination={{ position: ['topLeft'] }}/>
							</antd_1.Col>
						</antd_1.Row>
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>Jenzbar ©2020 Created by Jenzabar Team</Footer>
			</antd_1.Layout>);
    };
    return OfferingCatalogPage;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OfferingCatalogPage;
