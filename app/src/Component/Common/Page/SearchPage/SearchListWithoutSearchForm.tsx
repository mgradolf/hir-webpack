import React from "react"
import { Col, Row, Typography } from "antd"
import styles from "~/Component/Offering/OfferingFilterOpenButton.module.scss"
import { ResponsiveTable, IDataTableProps } from "~/Component/Common/ResponsiveTable"
import { HelpModal } from "~/Component/Common/Modal/HelpModal"

export interface ISearchListWithHiddenSearchFormProp {
  blocks?: JSX.Element[]
  title: string
  tableProps: IDataTableProps
  defaultFormValue?: { [key: string]: string }
  helpUrl?: string
}

export default function SearchListWithoutSearchForm(props: ISearchListWithHiddenSearchFormProp) {
  return (
    <div className="site-layout-content">
      <Row>
        <Col span={21}>
          <Typography.Title level={3}>{props.title}</Typography.Title>
        </Col>
      </Row>
      <Row justify="end" gutter={[8, 8]}>
        {props.blocks && props.blocks.map((x, i) => <Col key={i}>{x}</Col>)}
        {props.helpUrl && (
          <Col>
            <HelpModal helpUrl={props.helpUrl} />
          </Col>
        )}
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
        <Col className={`gutter-row ${styles.offeringDetails}`} xs={24} sm={24} md={{ span: 24, offset: 0 }}>
          <ResponsiveTable {...props.tableProps} searchParams={props.defaultFormValue} />
        </Col>
      </Row>
    </div>
  )
}
