import React, { useState, useEffect } from "react"
import { RouteComponentProps } from "react-router"
import { Row, Col, Typography, Space } from "antd"
import { findSectionProducts } from "~/ApiServices/BizApi/product/productIf"
import styles from "~/Pages/Section/Product/Product.module.scss"
import ResponsiveTable from "~/Component/Common/ResponsiveTable"
import ProductRemoveLink from "~/Component/Section/Product/ProductRemoveLink"
import ProductActionModalButton from "~/Component/Section/Product/ProductActionModalButton"
import { eventBus, REFRESH_SECTION_PRODUCT_PAGE } from "~/utils/EventBus"

const { Title } = Typography

function SectionProductPage(props: RouteComponentProps<{ sectionID: string }>) {
  const columns = [
    {
      title: "Product Name",
      dataIndex: "ProductName"
    },
    {
      title: "Current Status",
      dataIndex: "currentStatus"
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <ProductRemoveLink sectionId={parseInt(sectionID)} productId={record.ProductID} />
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
              <Col span="10">Current Status:</Col>
              <Col span="14">{data.DiscountType}</Col>
            </Row>
          </div>
        )}
      </>
    )
  }

  const sectionID = props.match.params.sectionID

  const [loading, setLoading] = useState<boolean>(false)
  const [sectionProductItems, setSectionProductItems] = useState<Array<any>>([])

  useEffect(() => {
    const loadSectionProducts = async function () {
      setLoading(true)
      const result = await findSectionProducts([{ SectionID: Number(sectionID) }])

      if (result && result.success) {
        setLoading(false)
        setSectionProductItems(
          result.data.map((x: any, index: number) => {
            x.key = index
            return x
          })
        )
      }
    }
    eventBus.subscribe(REFRESH_SECTION_PRODUCT_PAGE, loadSectionProducts)
    eventBus.publish(REFRESH_SECTION_PRODUCT_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_SECTION_PRODUCT_PAGE)
    }
  }, [sectionID])

  return (
    <div className="site-layout-content">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xs={24} sm={24} md={12}>
          <Title level={3}>Manage Section Products</Title>
        </Col>
        <Col className={`gutter-row ${styles.textAlignRight}`} xs={24} sm={24} md={12}>
          <ProductActionModalButton sectionId={parseInt(sectionID)} />
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
        <Col className={`gutter-row ${styles.sectionSeatGroupDetails}`} xs={24} sm={24} md={24}>
          <ResponsiveTable
            columns={columns}
            dataSource={sectionProductItems}
            loading={loading}
            expandableRowRender={expandableRowRender}
            bordered
            pagination={{ position: ["topLeft"], pageSize: 20 }}
            breakpoints={["md", "lg", "xl", "xxl"]}
            responsiveColumnIndices={[1]}
            scroll={{ y: 600 }}
          />
        </Col>
      </Row>
    </div>
  )
}

export default SectionProductPage
