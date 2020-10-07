import React, { useState, useEffect } from "react"
import { RouteComponentProps } from "react-router"
import { Row, Col, Typography, Space, Dropdown } from "antd"
import { getSectionDiscounts } from "~/ApiServices/Service/SectionService"
import styles from "~/Pages/Section/Budget/Budget.module.scss"
import ResponsiveTable from "~/Component/Common/ResponsiveTable"
import DiscountMenu from "~/Component/Section/Discount/DiscountMenu"
import DiscountActionModalButton from "~/Component/Section/Discount/DiscountActionModalButton"
import { eventBus, REFRESH_SECTION_DISCOUNT_PAGE } from "~/utils/EventBus"
import { DownOutlined } from "@ant-design/icons"

const { Title } = Typography

function SectionDiscountPage(props: RouteComponentProps<{ sectionID: string }>) {
  const columns = [
    {
      title: "Name",
      dataIndex: "DiscountProgramName"
    },
    {
      title: "Discount Type",
      dataIndex: "DiscountType"
    },
    {
      title: "GL Account",
      dataIndex: "GLAccount"
    },
    {
      title: "Amount",
      dataIndex: "Amount"
    },
    {
      title: "Amount Type",
      dataIndex: "DiscountAmountType"
    },
    {
      title: "Promoted?",
      dataIndex: "IsPromotedForMarketing",
      render: (value: any) => (value ? "Yes" : "No")
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
            overlay={<DiscountMenu sectionId={record.SectionID} sectionDiscountId={record.SectionDiscountID} />}
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
              <Col span="10">Discount Type:</Col>
              <Col span="14">{data.DiscountType}</Col>
            </Row>

            <Row>
              <Col span="10">GL Account:</Col>
              <Col span="14">{data.GLAccount}</Col>
            </Row>

            <Row>
              <Col span="10">Amount:</Col>
              <Col span="14">{data.Amount}</Col>
            </Row>

            <Row>
              <Col span="10">Amount Type:</Col>
              <Col span="14">{data.DiscountAmountType}</Col>
            </Row>

            <Row>
              <Col span="10">Promoted?:</Col>
              <Col span="14">{data.IsPromotedForMarketing ? "Yes" : "No"}</Col>
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
  const [sectionDiscountItems, setSectionDiscountItems] = useState<Array<any>>([])

  useEffect(() => {
    const loadSectionDiscounts = async function () {
      setLoading(true)
      const result = await getSectionDiscounts({ SectionID: Number(sectionID) })

      if (result && result.success) {
        setLoading(false)
        setSectionDiscountItems(
          result.data.map((x: any, index: number) => {
            x.key = index
            return x
          })
        )
      }
    }
    eventBus.subscribe(REFRESH_SECTION_DISCOUNT_PAGE, loadSectionDiscounts)
    eventBus.publish(REFRESH_SECTION_DISCOUNT_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_SECTION_DISCOUNT_PAGE)
    }
  }, [sectionID])

  return (
    <div className="site-layout-content">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xs={24} sm={24} md={12}>
          <Title level={3}>Manage Discount Programs</Title>
        </Col>
        <Col className={`gutter-row ${styles.textAlignRight}`} xs={24} sm={24} md={12}>
          <DiscountActionModalButton sectionId={parseInt(sectionID)} />
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
        <Col className={`gutter-row ${styles.sectionSeatGroupDetails}`} xs={24} sm={24} md={24}>
          <ResponsiveTable
            columns={columns}
            dataSource={sectionDiscountItems}
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

export default SectionDiscountPage
