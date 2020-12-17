import { Button, Col, Row, Typography } from "antd"
import React, { useState } from "react"
import { FilterOutlined } from "@ant-design/icons"
import styles from "~/Component/Offering/OfferingFilterOpenButton.module.scss"
import SearchFilters from "~/Component/Common/SearchFilters"
import { IFilterField } from "~/Component/Common/SearchFilters/common"
import { ResponsiveTable, IDataTableProps } from "~/Component/Common/ResponsiveTable"
import { HelpModal } from "~/Component/Common/Modal/HelpModal"

export interface IBlockComponentProp {
  component: React.FunctionComponent<any>
  props: { [key: string]: any }
  rowData?: Array<any>
}

export interface IDetailsSearchTabProp {
  blocks?: JSX.Element[]
  blockComponents?: IBlockComponentProp[]
  title?: string
  searchMeta?: IFilterField[]
  tableProps: IDataTableProps
  initialFilter?: { [key: string]: string }
  defaultFilter?: { [key: string]: string }
  helpKey?: string
}

export default function DetailsSearchTab(props: IDetailsSearchTabProp) {
  const [filterCount, setFilterCount] = useState(0)
  const [rowData, setRowData] = useState<Array<any>>([])
  const [searchParams, setSearchParams] = useState<{ [key: string]: any }>(
    props.initialFilter || props.defaultFilter || {}
  )
  const [showFilter, setShowFilter] = useState(false)
  const [help, setHelp] = useState(false)

  return (
    <>
      <Row>
        {props.title && (
          <Col span={21}>
            <Typography.Title level={3}>{props.title}</Typography.Title>
          </Col>
        )}
        {props.helpKey && (
          <Col span={3}>
            <Button type="link" onClick={() => setHelp(true)}>
              Help
            </Button>
          </Col>
        )}

        {props.helpKey && help && <HelpModal helpKey={props.helpKey} closeModal={() => setHelp(false)} />}
      </Row>

      {props.searchMeta && (
        <Row justify="start" gutter={[8, 8]}>
          <Col>
            <span>
              <FilterOutlined />
              <span> {filterCount === 0 ? "No" : filterCount} filters applied</span>
            </span>
          </Col>
        </Row>
      )}
      <Row justify="end" gutter={[8, 8]}>
        {props.searchMeta && (
          <Col>
            {!showFilter && (
              <Button type="primary" onClick={() => setShowFilter(true)}>
                Filters
              </Button>
            )}
          </Col>
        )}
        {props.blocks && props.blocks.map((x, i) => <Col key={i}>{x}</Col>)}
        {props.blockComponents && props.blockComponents.map((x, i) => <x.component {...x.props} rowData={rowData} />)}
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
        {props.searchMeta && (
          <SearchFilters
            title={""}
            isModalView={false}
            visible={showFilter}
            hideFilters={() => setShowFilter(false)}
            meta={props.searchMeta}
            initialFilter={searchParams}
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
          <ResponsiveTable
            {...props.tableProps}
            searchParams={searchParams}
            refreshEventName={props.title + Date.now().toString()}
            dataLoaded={(Params: any[]) => setRowData(Params)}
          />
        </Col>
      </Row>
    </>
  )
}
