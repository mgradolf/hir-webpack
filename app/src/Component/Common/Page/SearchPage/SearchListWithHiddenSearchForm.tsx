import { Button, Col, Row, Typography } from "antd"
import React, { useState } from "react"
import { FilterOutlined } from "@ant-design/icons"
import styles from "~/Component/Offering/OfferingFilterOpenButton.module.scss"
import { CustomForm } from "~/Component/Common/Form"
import { IField } from "~/Component/Common/Form/common"
import { ResponsiveTable, IDataTableProps } from "~/Component/Common/ResponsiveTable"
import { HelpModal } from "~/Component/Common/Modal/HelpModal"

export interface ISearchListWithHiddenSearchFormProp {
  blocks?: JSX.Element[]
  title: string
  meta?: IField[]
  tableProps: IDataTableProps
  initialFilter?: { [key: string]: string }
  defaultFilter?: { [key: string]: string }
  helpKey?: string
}

export default function SearchListWithHiddenSearchForm(props: ISearchListWithHiddenSearchFormProp) {
  const [filterCount, setFilterCount] = useState(0)
  const [searchParams, setSearchParams] = useState<{ [key: string]: any }>()
  const [showFilter, setShowFilter] = useState(false)
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
      <Row justify="start" gutter={[8, 8]}>
        <Col>
          <span>
            <FilterOutlined />
            <span> {filterCount === 0 ? "No" : filterCount} filters applied</span>
          </span>
        </Col>
      </Row>
      <Row justify="end" gutter={[8, 8]}>
        <Col>
          {!showFilter && (
            <Button type="primary" onClick={() => setShowFilter(true)}>
              Filters
            </Button>
          )}
        </Col>
        {props.blocks && props.blocks.map((x, i) => <Col key={i}>{x}</Col>)}
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
        {props.meta && (
          <CustomForm
            hideFilters={() => setShowFilter(false)}
            meta={props.meta}
            initialFilter={{ ...props.initialFilter, ...props.defaultFilter } || {}}
            onApplyChanges={(newFilterValues, appliedFilterCount) => {
              setSearchParams({ ...props.defaultFilter, ...newFilterValues })
              setFilterCount(appliedFilterCount)
              setShowFilter(false)
            }}
          />
        )}
        <Col
          className={`gutter-row ${styles.offeringDetails}`}
          xs={24}
          sm={24}
          md={{ span: showFilter ? 17 : 24, offset: showFilter ? 1 : 0 }}
        >
          <ResponsiveTable {...props.tableProps} searchParams={searchParams} />
        </Col>
      </Row>
    </div>
  )
}
