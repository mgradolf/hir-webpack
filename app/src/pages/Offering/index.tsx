import * as React from "react"
import moment from "moment"
import { Menu, Row, Col, Table, Space, Dropdown, Typography, Grid } from "antd"
import { Breakpoint } from "antd/lib/_util/responsiveObserve"

import { DownOutlined } from "@ant-design/icons"
import { SelectedFilters, FilterColumn, IFilterValues } from "~/Component/Offering"
import { searchOffering } from "~/ApiServices/Service/OfferingService"
import { RouteComponentProps, Link } from "react-router-dom"
import styles from "~/pages/Offering/Offering.module.scss"
import { REFRESH_OFFERING_PAGE, eventBus } from "~/utils/EventBus"

const { useState, useEffect } = React
const { Title } = Typography

const INITIAL_FILTER_DATA: IFilterValues = {
  OfferingCode: "",
  OfferingName: "",
  ToCreationDate: "",
  FromCreationDate: "",
  ToTerminationDate: "",
  FromTerminationDate: "",
  IsQuickAdmit: "",
  StatusID: -1,
  Coordinator: "",
  OrganizationID: -1,
  OfferingTypeID: -1,
  SectionTypeID: -1,
  InstructorID: -1,
  showProgramOffering: "",
  ComboSearchTagHierarchy: "",
  ComboSearchTagTypeIDHierarchy: "",
  ToFinalEnrollmentDate: "",
  FromFinalEnrollmentDate: ""
}

function generateMenu(record: any) {
  return (
    <Menu>
      <Menu.Item key="0">
        <Link to={`/offering/${record.OfferingID}/financial`}>Offering Financial</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to={`/offering/${record.OfferingID}/requisite`}>Requisite Management</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={`/offering/${record.OfferingID}/catalog`}>Catalogs</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={`/offering/${record.OfferingID}/tag`}>Offering Tag</Link>
      </Menu.Item>
      {record.HasApprovalProcess && (
        <Menu.Item key="4">
          <Link to={`/offering/${record.OfferingID}/approval`}>Offering Approval</Link>
        </Menu.Item>
      )}
      <Menu.Item key="5">
        <Link to={`/offering/${record.OfferingID}/instructor`}>Qualified Instructors</Link>
      </Menu.Item>
    </Menu>
  )
}

function expandableRowRender(data: any, display: boolean) {
  return (
    <div style={{ border: "1px solid", padding: "5px" }}>
      <Row>
        <Col span="8">Description:</Col>
        <Col span="16">{data.OfferingDescription}</Col>
      </Row>
      {display && (
        <Row>
          <Col span="8">Creation Date:</Col>
          <Col span="16">{data.CreationDate}</Col>
        </Row>
      )}

      {display && (
        <Row>
          <Col span="8">Termination Date:</Col>
          <Col span="16">{data.TerminationDate}</Col>
        </Row>
      )}

      {display && (
        <Row>
          <Col span="8">Status:</Col>
          <Col span="16">{data.StatusCode}</Col>
        </Row>
      )}

      {display && (
        <Row>
          <Col span="8">Department:</Col>
          <Col span="16">{data.OrganizationName}</Col>
        </Row>
      )}
      {display && (
        <Row>
          <Col span="8">Offering Type:</Col>
          <Col span="16">{data.OfferingTypeName}</Col>
        </Row>
      )}
      {display && (
        <Row>
          <Col span="8">Def Section:</Col>
          <Col span="16">{data.SectionTypeName}</Col>
        </Row>
      )}
    </div>
  )
}

function OfferingPage(props: RouteComponentProps) {
  const [filterData, updateFilterData] = useState<IFilterValues>(INITIAL_FILTER_DATA)
  const [showFilter, setFilterVisiblity] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [offeringItems, setOfferingItems] = useState<Array<any>>([])

  const [filterCount, setFilterCount] = useState<number>(0)

  const { useBreakpoint } = Grid
  const screens = useBreakpoint() as { [key: string]: boolean } // {xs: false, sm: true, md: false, lg: false, xl: false, …}
  const breakpoints = ["md", "lg", "xl", "xxl"]
  const display = breakpoints.filter((x) => screens[x]).length === 0

  const columns = [
    {
      title: "Offering Code",
      dataIndex: "OfferingCode",
      key: "OfferingCode",
      render: (text: any, record: any) => <Link to={`/offering/${record.OfferingID}`}>{text}</Link>,
      sorter: (a: any, b: any) => a.OfferingCode.length - b.OfferingCode.length
    },
    {
      title: "Offering Name",
      dataIndex: "OfferingName",
      key: "OfferingName",
      sorter: (a: any, b: any) => a.OfferingName.length - b.OfferingName.length
    },
    {
      title: "Creation Date",
      dataIndex: "CreationDate",
      key: "CreationDate",
      responsive: ["md", "lg", "xl", "xxl"] as Breakpoint[],
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
    },
    {
      title: "Termination Date",
      dataIndex: "TerminationDate",
      key: "TerminationDate",
      responsive: ["md", "lg", "xl", "xxl"] as Breakpoint[],
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
    },
    {
      title: "Status",
      dataIndex: "StatusCode",
      key: "StatusCode",
      responsive: ["md", "lg", "xl", "xxl"] as Breakpoint[],
      sorter: (a: any, b: any) => a.StatusCode.length - b.StatusCode.length
    },
    {
      title: "Department",
      dataIndex: "OrganizationName",
      responsive: ["md", "lg", "xl", "xxl"] as Breakpoint[],
      key: "OrganizationName"
    },
    {
      title: "Offering Type",
      dataIndex: "OfferingTypeName",
      responsive: ["md", "lg", "xl", "xxl"] as Breakpoint[],
      key: "OfferingTypeName"
    },
    {
      title: "Def Section",
      dataIndex: "SectionTypeName",
      responsive: ["md", "lg", "xl", "xxl"] as Breakpoint[],
      key: "SectionTypeName"
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <Dropdown overlay={generateMenu(record)} trigger={["click"]}>
            <a href="/" className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              Others <DownOutlined />
            </a>
          </Dropdown>
        </Space>
      )
    }
  ]

  useEffect(() => {
    const loadOfferings = async function () {
      setLoading(true)

      const params: { [key: string]: any } = {}
      params["OfferingCode"] = filterData.OfferingCode !== "" ? filterData.OfferingCode : "*"
      params["OfferingName"] = filterData.OfferingName !== "" ? filterData.OfferingName : undefined
      params["ToCreationDate"] = filterData.ToCreationDate !== "" ? filterData.ToCreationDate : undefined
      params["FromCreationDate"] = filterData.FromCreationDate !== "" ? filterData.FromCreationDate : undefined
      params["ToTerminationDate"] = filterData.ToTerminationDate !== "" ? filterData.ToTerminationDate : undefined
      params["FromTerminationDate"] = filterData.FromTerminationDate !== "" ? filterData.FromTerminationDate : undefined
      params["IsQuickAdmit"] = filterData.IsQuickAdmit !== "" ? filterData.IsQuickAdmit : undefined
      params["StatusID"] = filterData.StatusID >= 0 ? filterData.StatusID : undefined
      params["Coordinator"] = filterData.Coordinator !== "" ? filterData.Coordinator : undefined
      params["OrganizationID"] = filterData.OrganizationID >= 0 ? filterData.OrganizationID : undefined
      params["OfferingTypeID"] = filterData.OfferingTypeID >= 0 ? filterData.OfferingTypeID : undefined
      params["SectionTypeID"] = filterData.SectionTypeID >= 0 ? filterData.SectionTypeID : undefined
      params["InstructorID"] = filterData.InstructorID >= 0 ? filterData.InstructorID : undefined
      params["showProgramOffering"] = filterData.showProgramOffering !== "" ? filterData.showProgramOffering : undefined
      params["ComboSearchTagHierarchy"] =
        filterData.ComboSearchTagHierarchy !== "" ? filterData.ComboSearchTagHierarchy : undefined
      params["ComboSearchTagTypeIDHierarchy"] =
        filterData.ComboSearchTagTypeIDHierarchy !== "" ? filterData.ComboSearchTagTypeIDHierarchy : undefined
      params["ToFinalEnrollmentDate"] =
        filterData.ToFinalEnrollmentDate !== "" ? filterData.ToFinalEnrollmentDate : undefined
      params["FromFinalEnrollmentDate"] =
        filterData.FromFinalEnrollmentDate !== "" ? filterData.FromFinalEnrollmentDate : undefined

      const objectKeys = Object.keys(params)
      objectKeys.forEach((key) => {
        if (!params[key]) {
          delete params[key]
        }
      })

      const result = await searchOffering(params)

      if (result && result.success) {
        setOfferingItems(result.data)
      }
      setLoading(false)
    }
    eventBus.subscribe(REFRESH_OFFERING_PAGE, loadOfferings)
    eventBus.publish(REFRESH_OFFERING_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_OFFERING_PAGE)
    }
  }, [filterData])

  const toggleFilter = () => {
    setFilterVisiblity(!showFilter)
  }

  return (
    <div className="site-layout-content">
      <Row>
        <Title level={3}>Manage Offerings</Title>
      </Row>
      <SelectedFilters filterCount={filterCount} filterColumnVisible={showFilter} toggleFilter={toggleFilter} />
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={styles.paddingTop10px}>
        <FilterColumn
          visible={showFilter}
          toggleVisiibility={toggleFilter}
          data={filterData}
          onApplyChanges={(newFilterValues, appliedFilterCount) => {
            updateFilterData({ ...filterData, ...newFilterValues })
            setFilterCount(appliedFilterCount)
          }}
        />
        <Col
          className={`gutter-row ${styles.offeringDetails}`}
          xs={24}
          sm={24}
          md={{ span: showFilter ? 18 : 24, offset: showFilter ? 1 : 0 }}
        >
          <Table
            columns={columns}
            dataSource={offeringItems}
            loading={loading}
            bordered
            expandedRowRender={(record, index, indent, expanded) => {
              return expandableRowRender(record, display)
            }}
            rowKey="OfferingID"
            pagination={{ position: ["topLeft"] }}
            scroll={{ x: "fit-content" }}
          />
        </Col>
      </Row>
    </div>
  )
}
export default OfferingPage
