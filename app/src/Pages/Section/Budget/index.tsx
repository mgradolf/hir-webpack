import React, { useState, useEffect } from "react"
import { RouteComponentProps } from "react-router"
import { Row, Col, Typography, Space, Dropdown } from "antd"
import { getSectionFinancials } from "~/ApiServices/Service/SectionService"
import styles from "~/Pages/Section/Budget/Budget.module.scss"
import ResponsiveTable from "~/Component/Common/ResponsiveTable"
import BudgetMenu from "~/Component/Section/Budget/BudgetMenu"
import BudgetActionModalButton from "~/Component/Section/Budget/BudgetActionModalButton"
import { eventBus, REFRESH_SECTION_BUDGET_PAGE } from "~/utils/EventBus"
import { DownOutlined } from "@ant-design/icons"

const { Title } = Typography

function SectionBudgetPage(props: RouteComponentProps<{ sectionID: string }>) {
  const columns = [
    {
      title: "Type",
      dataIndex: "FinancialType"
    },
    {
      title: "Item",
      dataIndex: "ItemName"
    },
    {
      title: "Description",
      dataIndex: "Description"
    },
    {
      title: "Seat Group",
      dataIndex: "SeatGroupName"
    },
    {
      title: "GL Account",
      dataIndex: "GLAccount"
    },
    {
      title: "Basis",
      dataIndex: "FinancialBasisType"
    },
    {
      title: "Amount",
      dataIndex: "ItemUnitAmount"
    },
    {
      title: "Quantity",
      dataIndex: "ItemQty"
    },
    {
      title: "Item Code",
      dataIndex: "ItemCode"
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <Dropdown
            overlay={
              <BudgetMenu
                sectionId={record.SectionID}
                financialId={record.FinancialID}
                seatGroups={record.SeatGroups}
                sectionFinancialId={record.SectionFinancialID}
              />
            }
            trigger={["click"]}
          >
            <a href="/" className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              Others <DownOutlined />
            </a>
          </Dropdown>
        </Space>
      )
    }
  ]

  const expandableRowRender = (data: { [key: string]: any }, display: boolean): JSX.Element => {
    return (
      <>
        {display && (
          <div style={{ border: "1px solid", padding: "5px" }}>
            <Row>
              <Col span="10">Description:</Col>
              <Col span="14">{data.Description}</Col>
            </Row>

            <Row>
              <Col span="10">Seat Group:</Col>
              <Col span="14">{data.SeatGroupName}</Col>
            </Row>

            <Row>
              <Col span="10">GL Account:</Col>
              <Col span="14">{data.GLAccount}</Col>
            </Row>

            <Row>
              <Col span="10">Basis:</Col>
              <Col span="14">{data.FinancialBasisType}</Col>
            </Row>

            <Row>
              <Col span="10">Amount:</Col>
              <Col span="14">{data.ItemUnitAmount}</Col>
            </Row>

            <Row>
              <Col span="10">Quantity:</Col>
              <Col span="14">{data.ItemQty}</Col>
            </Row>

            <Row>
              <Col span="10">Item Code:</Col>
              <Col span="14">{data.ItemCode}</Col>
            </Row>
          </div>
        )}
      </>
    )
  }

  const sectionID = props.match.params.sectionID
  console.log("Section ID: ", sectionID)

  const [loading, setLoading] = useState<boolean>(false)
  const [sectionFinancialItems, setSectionFinancialItems] = useState<Array<any>>([])

  useEffect(() => {
    const loadSectionFinancials = async function () {
      setLoading(true)
      const result = await getSectionFinancials({ SectionID: sectionID })

      if (result && result.success) {
        setLoading(false)
        setSectionFinancialItems(
          result.data.map((x: any, index: number) => {
            x.key = index
            x.SeatGroupName = "None"

            let seatGroupName = ""
            const seatGroups = x.SeatGroups
            if (seatGroups !== null) {
              for (let i = 0; i < seatGroups.length; i++) {
                if (i > 0) seatGroupName += ", "
                seatGroupName += seatGroups[i].Name
              }
            }
            if (seatGroupName !== "") x.SeatGroupName = seatGroupName

            return x
          })
        )
      }
    }
    eventBus.subscribe(REFRESH_SECTION_BUDGET_PAGE, loadSectionFinancials)
    eventBus.publish(REFRESH_SECTION_BUDGET_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_SECTION_BUDGET_PAGE)
    }
  }, [sectionID])

  return (
    <div className="site-layout-content">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xs={24} sm={24} md={12}>
          <Title level={3}>Manage Budgets</Title>
        </Col>
        <Col className={`gutter-row ${styles.textAlignRight}`} xs={24} sm={24} md={12}>
          <BudgetActionModalButton sectionId={parseInt(sectionID)} />
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
        <Col className={`gutter-row ${styles.sectionSeatGroupDetails}`} xs={24} sm={24} md={24}>
          <ResponsiveTable
            columns={columns}
            dataSource={sectionFinancialItems}
            loading={loading}
            expandableRowRender={expandableRowRender}
            bordered
            pagination={{ position: ["topLeft"], pageSize: 20 }}
            breakpoints={["md", "lg", "xl", "xxl"]}
            responsiveColumnIndices={[1, 2, 3, 4, 5, 6, 7]}
            scroll={{ y: 600 }}
          />
        </Col>
      </Row>
    </div>
  )
}

export default SectionBudgetPage
