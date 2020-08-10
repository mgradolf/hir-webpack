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
var moment_1 = require('moment');
var antd_1 = require('antd');
var antd_2 = require('antd');
var icons_1 = require('@ant-design/icons');
var OfferingServiceWrap_1 = require('~/api-wrappers/Service/OfferingServiceWrap');
var Offering_module_scss_1 = require("~/pages/Offering/Offering.module.scss");
var Header = antd_1.Layout.Header, Content = antd_1.Layout.Content, Footer = antd_1.Layout.Footer;
var SubMenu = antd_1.Menu.SubMenu;
var Title = antd_2.Typography.Title;
var RangePicker = antd_2.DatePicker.RangePicker;
var Option = antd_1.Select.Option;
var dateFormat = 'MM/DD/YYYY';
var OfferingPage = (function (_super) {
    __extends(OfferingPage, _super);
    function OfferingPage() {
        var _this = this;
        _super.apply(this, arguments);
        this.filterCount = 0;
        this.columns = [
            {
                title: 'Offering Code',
                dataIndex: 'OfferingCode',
                key: 'OfferingCode',
                sorter: function (a, b) { return a.OfferingCode.length - b.OfferingCode.length; },
            },
            {
                title: 'Offering Name',
                dataIndex: 'OfferingName',
                key: 'OfferingName',
                sorter: function (a, b) { return a.OfferingName.length - b.OfferingName.length; },
            },
            {
                title: 'Creation Date',
                dataIndex: 'CreationDate',
                key: 'CreationDate',
                render: function (text) { return text != null ? moment_1.default(text).format('YYYY-MM-DD') : ''; }
            },
            {
                title: 'Termination Date',
                dataIndex: 'TerminationDate',
                key: 'TerminationDate',
                render: function (text) { return text != null ? moment_1.default(text).format('YYYY-MM-DD') : ''; }
            },
            {
                title: 'Status',
                dataIndex: 'StatusCode',
                key: 'StatusCode',
                sorter: function (a, b) { return a.StatusCode.length - b.StatusCode.length; },
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
                render: function (record) { return (<antd_2.Space size="middle">
					<antd_2.Dropdown overlay={OfferingPage.generateMenu(record)} trigger={['click']}>
						<a className="ant-dropdown-link" onClick={function (e) { return e.preventDefault(); }}>
							Select actions <icons_1.DownOutlined />
						</a>
					</antd_2.Dropdown>
				</antd_2.Space>); },
            }
        ];
        this.state = {
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
        this.handleCreationDateChange = function (dateString) {
            if (dateString != null) {
                _this.setState({
                    FromCreationDate: dateString[0],
                    ToCreationDate: dateString[1]
                });
            }
        };
        this.handleTerminationDateChange = function (dateString) {
            if (dateString != null) {
                _this.setState({
                    FromTerminationDate: dateString[0],
                    ToTerminationDate: dateString[1]
                });
            }
        };
        this.handleInputChange = function (event) {
            _this.setState((_a = {},
                _a[event.target.name] = event.target.value,
                _a
            ));
            var _a;
        };
        this.handleSubmit = function (event) {
            event.preventDefault();
            _this.setState({
                filterCounter: _this.filterCount
            });
            _this.searchOffering();
        };
        this.toggleFilter = function () {
            _this.setState({
                showFilter: !_this.state.showFilter
            });
        };
        this.toggleOfferingCodeBLock = function (event) {
            _this.setState({
                showOfferingCodeBlock: !_this.state.showOfferingCodeBlock,
                OfferingCode: event.target.checked ? _this.state.OfferingCode : "",
            });
            _this.filterCounter(event);
        };
        this.toggleOfferingNameBLock = function (event) {
            _this.setState({
                showOfferingNameBlock: !_this.state.showOfferingNameBlock,
                OfferingName: event.target.checked ? _this.state.OfferingName : "",
            });
            _this.filterCounter(event);
        };
        this.toggleCreationDateBLock = function (event) {
            _this.setState({
                showCreationDateBlock: !_this.state.showCreationDateBlock
            });
            _this.filterCounter(event);
        };
        this.toggleTerminationDateBLock = function (event) {
            _this.setState({
                showTerminationDateBlock: !_this.state.showTerminationDateBlock
            });
            _this.filterCounter(event);
        };
        this.toggleIsQuickAdmitBLock = function (event) {
            _this.setState({
                showIsQuickAdmitBlock: !_this.state.showIsQuickAdmitBlock
            });
            _this.filterCounter(event);
        };
        this.filterCounter = function (event) {
            _this.setState({
                filterCounter: event.target.checked ? _this.state.filterCounter + 1 : _this.state.filterCounter - 1
            });
            _this.filterCount = event.target.checked ? _this.state.filterCounter + 1 : _this.state.filterCounter - 1;
        };
    }
    OfferingPage.expandableRowRender = function (data) {
        return (<div style={{ border: "1px solid", padding: "5px" }}>
				<antd_1.Row>
					<antd_1.Col span="8" className={Offering_module_scss_1.default.fontWeightBold}>
						Description:
					</antd_1.Col>
					<antd_1.Col span="16">
						{data.OfferingDescription}
					</antd_1.Col>
				</antd_1.Row>
			</div>);
    };
    OfferingPage.generateMenu = function (record) {
        return (<antd_1.Menu>
				<antd_1.Menu.Item key="0">
					<a href={"/offering/" + record.OfferingID + "/financial"}>Offering Financial</a>
				</antd_1.Menu.Item>
				<antd_1.Menu.Item key="1">
					<a href="/">Requisite Management</a>
				</antd_1.Menu.Item>
				<antd_1.Menu.Item key="2">
					<a href="/">Catalogs</a>
				</antd_1.Menu.Item>
				<antd_1.Menu.Item key="3">
					<a href="/">Offering Tag</a>
				</antd_1.Menu.Item>
				<antd_1.Menu.Item key="4">
					<a href="/">Offering Approval</a>
				</antd_1.Menu.Item>
				<antd_1.Menu.Item key="5">
					<a href="/">Qualified Instructors</a>
				</antd_1.Menu.Item>
			</antd_1.Menu>);
    };
    OfferingPage.prototype.searchOffering = function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.setState({
                loading: true
            });
            var params = {
                OfferingCode: this.state.OfferingCode == '' ? '*' : this.state.OfferingCode,
                OfferingName: this.state.OfferingName == '' ? '*' : this.state.OfferingName,
            };
            /*if (this.state.FromCreationDate != '') {
                params["FromCreationDate"] = this.state.FromCreationDate;
            }
            if (this.state.ToCreationDate != '') {
                params["ToCreationDate"] = this.state.ToCreationDate;
            }*/
            var _a = yield OfferingServiceWrap_1.searchOfferingWrap(params), result = _a[0], error = _a[1];
            if (result) {
                this.setState({
                    loading: false,
                    offeringItems: result.data
                });
            }
        });
    };
    OfferingPage.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.searchOffering();
        });
    };
    OfferingPage.prototype.render = function () {
        var _a = this.state, showFilter = _a.showFilter, offeringItems = _a.offeringItems, loading = _a.loading, OfferingName = _a.OfferingName, OfferingCode = _a.OfferingCode, FromCreationDate = _a.FromCreationDate, ToCreationDate = _a.ToCreationDate, FromTerminationDate = _a.FromTerminationDate, ToTerminationDate = _a.ToTerminationDate, showOfferingCodeBlock = _a.showOfferingCodeBlock, showOfferingNameBlock = _a.showOfferingNameBlock, showCreationDateBlock = _a.showCreationDateBlock, showTerminationDateBlock = _a.showTerminationDateBlock, showIsQuickAdmitBlock = _a.showIsQuickAdmitBlock;
        var fromCreationDate = FromCreationDate != '' ? moment_1.default(FromCreationDate, dateFormat) : moment_1.default(new Date(), dateFormat);
        var toCreationDate = ToCreationDate != '' ? moment_1.default(ToCreationDate, dateFormat) : moment_1.default(new Date(), dateFormat);
        var fromTerminationDate = FromTerminationDate != '' ? moment_1.default(FromTerminationDate, dateFormat) : moment_1.default(new Date(), dateFormat);
        var toTerminationDate = ToTerminationDate != '' ? moment_1.default(ToTerminationDate, dateFormat) : moment_1.default(new Date(), dateFormat);
        return (<antd_1.Layout className="layout">
				<Header>
					<div>
						<img className={Offering_module_scss_1.default.logo} src="./images/logo.png" alt="JE Home Page"/>
					</div>
					<antd_1.Menu theme="dark" mode="horizontal">
						<SubMenu key="sub1" title="Manage">
							<antd_1.Menu.Item key="1">
								<a href="/">Offering</a>
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
						<antd_1.Menu.Item key="4" className={Offering_module_scss_1.default.floatRight}>
							<a href="/login">Logout</a>
						</antd_1.Menu.Item>
					</antd_1.Menu>
				</Header>
				<Content style={{ padding: '0 50px' }}>
					<antd_1.Breadcrumb style={{ margin: '16px 0' }}>
						<antd_1.Breadcrumb.Item>
							<a href="/">Home</a>
						</antd_1.Breadcrumb.Item>
						<antd_1.Breadcrumb.Item>
							<a href="/offering">Offering</a>
						</antd_1.Breadcrumb.Item>
						<antd_1.Breadcrumb.Item>Search</antd_1.Breadcrumb.Item>
					</antd_1.Breadcrumb>
					<div className="site-layout-content">
						<antd_1.Row>
							<Title level={3}>Manage Offerings</Title>
						</antd_1.Row>
						<antd_1.Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<antd_1.Col className="gutter-row" xs={24} sm={24} md={12}>
								<a href="javascript:void(0)" onClick={this.toggleFilter}>
									<icons_1.FilterOutlined />
									<span> {this.filterCount == 0 ? 'No' : this.filterCount} filters applied</span>
								</a>
							</antd_1.Col>
							<antd_1.Col className={"gutter-row " + Offering_module_scss_1.default.textAlignRight} xs={24} sm={24} md={12}>
								<antd_1.Button type="primary" className={showFilter ? Offering_module_scss_1.default.hidden : Offering_module_scss_1.default.marginRight5px} onClick={this.toggleFilter}>Filters</antd_1.Button>
								<antd_1.Button type="primary">+ Create Offering</antd_1.Button>
							</antd_1.Col>
						</antd_1.Row>

						<antd_1.Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={Offering_module_scss_1.default.paddingTop10px}>
							<antd_1.Col className={showFilter ? "gutter-row " + Offering_module_scss_1.default.offeringFilter : Offering_module_scss_1.default.hidden} xs={24} sm={24} md={5}>
								<antd_1.Row>
									<antd_1.Col span={12}>
										<Title level={4}>Offering Filter</Title>
									</antd_1.Col>
									<antd_1.Col span={12} className={Offering_module_scss_1.default.padding5px}>
										<a href="javascript:void(0);" onClick={this.toggleFilter}>
											<icons_1.CloseOutlined style={{ fontSize: "20px", color: "black", float: "right" }}/>
										</a>
									</antd_1.Col>
								</antd_1.Row>
								<antd_1.Row>
									<antd_2.Checkbox onChange={this.toggleOfferingCodeBLock}>Offering Code</antd_2.Checkbox>
									<antd_1.Row className={showOfferingCodeBlock ? Offering_module_scss_1.default.offeringFilterField : Offering_module_scss_1.default.hidden}>
										<antd_1.Input name="OfferingCode" defaultValue="" value={OfferingCode == "*" ? "" : OfferingCode} onChange={this.handleInputChange}/>
									</antd_1.Row>
								</antd_1.Row>
								<antd_1.Row>
									<antd_2.Checkbox onChange={this.toggleOfferingNameBLock}>Offering Name</antd_2.Checkbox>
									<antd_1.Row className={showOfferingNameBlock ? Offering_module_scss_1.default.offeringFilterField : Offering_module_scss_1.default.hidden}>
										<antd_1.Input name="OfferingName" defaultValue="" value={OfferingName == "*" ? "" : OfferingName} onChange={this.handleInputChange}/>
									</antd_1.Row>
								</antd_1.Row>
								<antd_1.Row>
									<antd_2.Checkbox onChange={this.toggleCreationDateBLock}>Creation Date</antd_2.Checkbox>
									<antd_1.Row className={showCreationDateBlock ? Offering_module_scss_1.default.offeringFilterField : Offering_module_scss_1.default.hidden}>
										<RangePicker value={[fromCreationDate, toCreationDate]} onChange={this.handleCreationDateChange} format={dateFormat}/>
									</antd_1.Row>
								</antd_1.Row>
								<antd_1.Row>
									<antd_2.Checkbox onChange={this.toggleTerminationDateBLock}>Termination Date</antd_2.Checkbox>
									<antd_1.Row className={showTerminationDateBlock ? Offering_module_scss_1.default.offeringFilterField : Offering_module_scss_1.default.hidden}>
										<RangePicker value={[fromTerminationDate, toTerminationDate]} onChange={this.handleTerminationDateChange} format={dateFormat}/>
									</antd_1.Row>
								</antd_1.Row>
								<antd_1.Row>
									<antd_2.Checkbox onChange={this.toggleIsQuickAdmitBLock}>Is QuickAdmit</antd_2.Checkbox>
									<antd_1.Row className={showIsQuickAdmitBlock ? Offering_module_scss_1.default.offeringFilterField : Offering_module_scss_1.default.hidden}>
										<antd_1.Select defaultValue="1" style={{ width: 200 }}>
											<Option value="1">Yes</Option>
											<Option value="2">No</Option>
										</antd_1.Select>
									</antd_1.Row>
								</antd_1.Row>
								<antd_1.Row className={Offering_module_scss_1.default.floatRight}>
									<antd_1.Button type="primary" className={Offering_module_scss_1.default.applyBtn} onClick={this.handleSubmit}>Apply</antd_1.Button>
								</antd_1.Row>
							</antd_1.Col>
							<antd_1.Col className={"gutter-row " + Offering_module_scss_1.default.offeringDetails} xs={24} sm={24} md={{ span: showFilter ? 18 : 24, offset: showFilter ? 1 : 0 }}>
								<antd_2.Table columns={this.columns} dataSource={offeringItems} loading={loading} bordered expandedRowRender={OfferingPage.expandableRowRender} rowKey="OfferingID" pagination={{ position: ['topLeft'] }}/>
							</antd_1.Col>
						</antd_1.Row>
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>Jenzbar ©2020 Created by Jenzabar Team</Footer>
			</antd_1.Layout>);
    };
    return OfferingPage;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OfferingPage;
