import { Button, Col, Row, Typography } from "antd"
import React, { useState } from "react"
import styles from "~/Component/Offering/OfferingFilterOpenButton.module.scss"
import { IField } from "~/Component/Common/SearchForm/common"
import { ResponsiveTable, IDataTableProps } from "~/Component/Common/ResponsiveTable"
import { HelpModal } from "~/Component/Common/Modal/HelpModal"

export interface IStandardPageProp {
  blocks?: JSX.Element[]
  title: string
  meta?: IField[]
  tableProps: IDataTableProps
  initialFilter?: { [key: string]: any }
  defaultFilter?: { [key: string]: string }
  helpKey?: string
}

export default function StandardPage(props: IStandardPageProp) {
  const [searchParams] = useState<{ [key: string]: any }>(props.initialFilter || props.defaultFilter || {})
  const [help, setHelp] = useState(false)

  return (
    <div className="site-layout-content">
      <Row>
        <Col span={21}>
          <Typography.Title level={3}>{props.title}</Typography.Title>
        </Col>
        {props.helpKey && (
          <Col span={3}>
            <Button type="link" onClick={() => setHelp(true)}>
              Help
            </Button>
          </Col>
        )}
        {props.helpKey && help && <HelpModal helpKey={props.helpKey} closeModal={() => setHelp(false)} />}
      </Row>
      {props.blocks && (
        <Row justify="end" gutter={[8, 8]}>
          {props.blocks && props.blocks.map((x, i) => <Col key={i}>{x}</Col>)}
        </Row>
      )}
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
        <Col className={`gutter-row ${styles.offeringDetails}`} xs={24} sm={24} md={24}>
          <ResponsiveTable {...props.tableProps} searchParams={searchParams} />
        </Col>
      </Row>
    </div>
  )
}
