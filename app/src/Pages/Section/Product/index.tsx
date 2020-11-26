import React from "react"
import { RouteComponentProps } from "react-router"
import { Row, Col, Typography, Space } from "antd"
import { findSectionProducts } from "~/ApiServices/BizApi/product/productIf"
import styles from "~/Pages/Section/Product/Product.module.scss"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import ProductRemoveLink from "~/Component/Section/Product/ProductRemoveLink"
import { ProductAddButton } from "~/Component/Section/Product/ProductAddButton"

const { Title } = Typography

function SectionProductPage(props: RouteComponentProps<{ sectionID: string }>) {
  const SectionID = Number(props?.match?.params?.sectionID)

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
          <ProductRemoveLink sectionId={SectionID} productId={record.ProductID} />
        </Space>
      )
    }
  ]

  return (
    <div className="site-layout-content">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xs={24} sm={24} md={12}>
          <Title level={3}>Manage Section Products</Title>
        </Col>
        <Col className={`gutter-row ${styles.textAlignRight}`} xs={24} sm={24} md={12}>
          <ProductAddButton SectionId={SectionID} />
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
        <Col className={`gutter-row ${styles.sectionSeatGroupDetails}`} xs={24} sm={24} md={24}>
          <ResponsiveTable
            columns={columns}
            searchFunc={findSectionProducts}
            searchParams={{ SectionID }}
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
