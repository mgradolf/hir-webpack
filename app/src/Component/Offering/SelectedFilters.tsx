import { Row, Col, Button } from "antd"
import React from "react"
import CreateActionButton from "~/Component/Offering/CreateEdit/OfferingModalOpenButton"
import { FilterOutlined } from "@ant-design/icons"
import styles from "~/Component/Offering/SelectedFilters.module.scss"

interface IToolbarProps {
  filterCount: number
  filterColumnVisible: boolean
  toggleFilter: () => void
  hideCreateButton?: boolean
}

export function SelectedFilters(props: IToolbarProps) {
  return (
    <Row>
      <Col className="gutter-row" xs={24} sm={24} md={12}>
        <span>
          <FilterOutlined />
          <span> {props.filterCount === 0 ? "No" : props.filterCount} filters applied</span>
        </span>
      </Col>
      <Col className={`gutter-row ${styles.textAlign}`} xs={24} sm={24} md={12}>
        <Button
          type="primary"
          className={props.filterColumnVisible ? styles.hidden : styles.marginRight5px}
          onClick={props.toggleFilter}
        >
          Filters
        </Button>
        {!props.hideCreateButton && <CreateActionButton />}
      </Col>
    </Row>
  )
}
