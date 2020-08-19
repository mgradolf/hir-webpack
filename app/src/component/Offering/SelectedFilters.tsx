import { Row, Col, Button } from "antd"
import React from "react"
import CreateActionButton from "~/component/Offering/CreateEdit/OfferingModalOpenButton"
import { FilterOutlined } from "@ant-design/icons"
import styles from "~/component/Offering/SelectedFilters.module.scss"

interface IToolbarProps {
  filterCount: number
  filterColumnVisible: boolean
  toggleFilter: () => void
}

export function SelectedFilters(props: IToolbarProps) {
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col className="gutter-row" xs={24} sm={24} md={12}>
        <span onClick={props.toggleFilter}>
          <FilterOutlined />
          <span> {props.filterCount === 0 ? "No" : props.filterCount} filters applied</span>
        </span>
      </Col>
      <Col className={`gutter-row ${styles.textAlignRight}`} xs={24} sm={24} md={12}>
        <Button
          type="primary"
          className={props.filterColumnVisible ? styles.hidden : styles.marginRight5px}
          onClick={props.toggleFilter}
        >
          Filters
        </Button>
        <CreateActionButton />
      </Col>
    </Row>
  )
}
