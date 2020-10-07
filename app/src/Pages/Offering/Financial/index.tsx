import React, { useState, useEffect } from "react"

import { RouteComponentProps } from "react-router"
import { Row, Col, Typography, Space, Dropdown } from "antd"
import { searchOfferingFinancial } from "~/ApiServices/Service/OfferingService"
import styles from "~/Pages/Offering/Financial/Financial.module.scss"
import ResponsiveTable from "~/Component/Common/ResponsiveTable"
import OfferingFinancialModalOpenButton from "~/Component/Offering/Financial/OfferingFinancialModalOpenButton"
import { eventBus, REFRESH_OFFERING_FINANCIAL_PAGE } from "~/utils/EventBus"
import FinancialMenu from "~/Component/Offering/Financial/FinancialMenu"
import { DownOutlined } from "@ant-design/icons"

const { Title } = Typography

function OfferingFinancialPage(props: RouteComponentProps<{ offeringID: string }>) {
  const columns = [
    {
      title: "Description",
      dataIndex: "Description"
    },
    {
      title: "Category",
      dataIndex: "FinancialCategoryType"
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
      title: "Type",
      dataIndex: "FinancialType"
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
      dataIndex: "GLAccount"
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <Dropdown
            overlay={<FinancialMenu offeringId={record.ApplyToID} financialId={record.FinancialID} />}
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
              <Col span="8">Category:</Col>
              <Col span="16">{data.FinancialCategoryType}</Col>
            </Row>

            <Row>
              <Col span="8">Basis:</Col>
              <Col span="16">{data.FinancialBasisType}</Col>
            </Row>

            <Row>
              <Col span="8">Amount:</Col>
              <Col span="16">{data.ItemUnitAmount}</Col>
            </Row>

            <Row>
              <Col span="8">Type:</Col>
              <Col span="16">{data.FinancialType}</Col>
            </Row>

            <Row>
              <Col span="8">Optional:</Col>
              <Col span="16">{data.IsOptional ? "Yes" : "No"}</Col>
            </Row>

            <Row>
              <Col span="8">Taxable:</Col>
              <Col span="16">{data.IsTaxable ? "Yes" : "No"}</Col>
            </Row>

            <Row>
              <Col span="8">Weight:</Col>
              <Col span="16">{data.Weight}</Col>
            </Row>

            <Row>
              <Col span="8">Active:</Col>
              <Col span="16">{data.IsActive ? "Yes" : "No"}</Col>
            </Row>

            <Row>
              <Col span="8">GL Account:</Col>
              <Col span="16">{data.GLAccount}</Col>
            </Row>
          </div>
        )}
      </>
    )
  }

  const offeringID = props.match.params.offeringID
  const [loading, setLoading] = useState<boolean>(false)
  const [offeringFinancialItems, setOfferingFinancialItems] = useState<Array<any>>([])

  useEffect(() => {
    const loadOfferingFinancials = async function () {
      setLoading(true)

      const result = await searchOfferingFinancial(Number(offeringID))

      if (result && result.success) {
        setLoading(false)
        setOfferingFinancialItems(
          result.data.map((x: any, index: number) => {
            x.key = index
            return x
          })
        )
      }
    }
    eventBus.subscribe(REFRESH_OFFERING_FINANCIAL_PAGE, loadOfferingFinancials)
    eventBus.publish(REFRESH_OFFERING_FINANCIAL_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_OFFERING_FINANCIAL_PAGE)
    }
  }, [offeringID])

  return (
    <div className="site-layout-content">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xs={24} sm={24} md={12}>
          <Title level={3}>Manage Offering Financial</Title>
        </Col>
        <Col className={`gutter-row ${styles.textAlignRight}`} xs={24} sm={24} md={12}>
          <OfferingFinancialModalOpenButton offeringId={parseInt(offeringID)} />
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
        <Col className={`gutter-row ${styles.offeringFinancialDetails}`} xs={24} sm={24} md={24}>
          <ResponsiveTable
            columns={columns}
            dataSource={offeringFinancialItems}
            loading={loading}
            expandableRowRender={expandableRowRender}
            bordered
            pagination={{ position: ["topLeft"], pageSize: 20 }}
            breakpoints={["md", "lg", "xl", "xxl"]}
            responsiveColumnIndices={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            scroll={{ y: 600 }}
          />
        </Col>
      </Row>
    </div>
  )
}

export default OfferingFinancialPage
