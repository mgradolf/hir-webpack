import { Button, Col, Row, Typography } from "antd"
import React, { useState } from "react"
import { FilterOutlined } from "@ant-design/icons"
import styles from "~/Component/Offering/OfferingFilterOpenButton.module.scss"
import SearchFilters from "~/Component/Common/SearchFilters"
import { IFilterField } from "~/Component/Common/SearchFilters/common"
import ResponsiveTable, { IDataTableProps } from "~/Component/Common/ResponsiveTable"

interface IModal {
  closeModal: (sections?: any[]) => void
}

interface IStandardSearchListProp {
  title: string
  modalOpenButtonText?: string
  modalToBeOpen?: JSX.Element
  showModal?: boolean
  setShowModal?: (flag: boolean) => void
  meta: IFilterField[]
  tableProps: IDataTableProps
}

export default function StandardSearchList(props: IStandardSearchListProp) {
  const [filterCount, setFilterCount] = useState(0)
  const [showFilter, setShowFilter] = useState(false)
  const [searchParams, setSearchParams] = useState<{ [key: string]: any }>({})

  return (
    <div className="site-layout-content">
      <Row>
        <Typography.Title level={3}>{props.title}</Typography.Title>
      </Row>
      <Row>
        <Col className="gutter-row" xs={24} sm={24} md={12}>
          <span>
            <FilterOutlined />
            <span> {filterCount === 0 ? "No" : filterCount} filters applied</span>
          </span>
        </Col>
        <Col className={`gutter-row ${styles.textAlign}`} xs={24} sm={24} md={12}>
          {!showFilter && (
            <Button type="primary" className={styles.marginRight5px} onClick={() => setShowFilter(true)}>
              Filters
            </Button>
          )}
          <>
            {props.setShowModal && (
              <Button
                type="primary"
                style={{ float: "right" }}
                onClick={() => props.setShowModal && props.setShowModal(true)}
              >
                {props.modalOpenButtonText}
              </Button>
            )}
            {props.showModal && props.modalToBeOpen}
          </>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
        <SearchFilters
          title={""}
          isModalView={false}
          visible={showFilter}
          hideFilters={() => setShowFilter(false)}
          meta={props.meta}
          initialFilter={searchParams}
          onApplyChanges={(newFilterValues, appliedFilterCount) => {
            setSearchParams(newFilterValues)
            setFilterCount(appliedFilterCount)
            setShowFilter(false)
          }}
        />
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
