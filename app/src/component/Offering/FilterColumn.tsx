import React, { useState } from "react"
import { Col, Row, Checkbox, Input, Select, Button, Typography, DatePicker } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import moment from "moment"
import { CheckboxChangeEvent } from "antd/lib/checkbox"
import styles from "~/component/Offering/FilterColumn.module.scss"

const { Option } = Select
const { Title, Text } = Typography

export interface IFilterValues {
  OfferingCode: string
  OfferingName: string
  ToCreationDate: string
  FromCreationDate: string
  ToTerminationDate: string
  FromTerminationDate: string
}

const dateFormat = "MM/DD/YYYY"

interface IFilterColumnProps {
  visible: boolean
  toggleVisiibility: () => void
  onApplyChanges: (newValues: IFilterValues, appliedFilterCount: number) => void
  data: IFilterValues
}

export function FilterColumn(props: IFilterColumnProps) {
  const { visible, toggleVisiibility, data } = props

  const [filterData, updateFilterData] = useState<IFilterValues>(data)

  const [showOfferingCodeBlock, setOfferingCodeBLockVisible] = useState<boolean>(false)
  const [showOfferingNameBlock, setOfferingNameBLockVisible] = useState<boolean>(false)
  const [showCreationDateBlock, setCreationDateBLockVisible] = useState<boolean>(false)
  const [showIsQuickAdmitBlock, setIsQuickAdmitBLockVisible] = useState<boolean>(false)
  const [showTerminationDateBlock, setTerminationDateBLockVisible] = useState<boolean>(false)

  const filterCount = [
    showOfferingCodeBlock,
    showOfferingNameBlock,
    showCreationDateBlock,
    showIsQuickAdmitBlock,
    showTerminationDateBlock
  ].filter(Boolean).length

  const fromCreationDate =
    filterData.FromCreationDate !== "" ? moment(filterData.FromCreationDate, dateFormat) : undefined
  const toCreationDate = filterData.ToCreationDate !== "" ? moment(filterData.ToCreationDate, dateFormat) : undefined

  const fromTerminationDate =
    filterData.FromTerminationDate !== "" ? moment(filterData.FromTerminationDate, dateFormat) : undefined
  const toTerminationDate =
    filterData.ToTerminationDate !== "" ? moment(filterData.ToTerminationDate, dateFormat) : undefined

  const toggleOfferingCodeBLock = (event: CheckboxChangeEvent) => {
    setOfferingCodeBLockVisible(!showOfferingCodeBlock)
    updateFilterData({ ...filterData, OfferingCode: event.target.checked ? filterData.OfferingCode : "" })
  }

  const toggleOfferingNameBLock = (event: CheckboxChangeEvent) => {
    setOfferingNameBLockVisible(!showOfferingNameBlock)
    updateFilterData({ ...filterData, OfferingName: event.target.checked ? filterData.OfferingName : "" })
  }

  const toggleCreationDateBLock = (event: CheckboxChangeEvent) => {
    setCreationDateBLockVisible(!showCreationDateBlock)
  }

  const toggleTerminationDateBLock = (event: CheckboxChangeEvent) => {
    setTerminationDateBLockVisible(!showTerminationDateBlock)
  }

  const toggleIsQuickAdmitBLock = (event: CheckboxChangeEvent) => {
    setIsQuickAdmitBLockVisible(!showIsQuickAdmitBlock)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFilterData({
      ...filterData,
      [event.target.name as keyof IFilterValues]: event.target.value
    })
  }

  const handleCreationDateChange = (dateString: any) => {
    if (dateString !== null) {
      updateFilterData({
        ...filterData,
        FromCreationDate: dateString
      })
    }
  }

  const handleTerminationDateChange = (dateString: any) => {
    if (dateString !== null) {
      updateFilterData({
        ...filterData,
        FromTerminationDate: dateString
      })
    }
  }

  return (
    <Col className={visible ? `gutter-row ${styles.offeringFilter}` : styles.hidden} xs={24} sm={24} md={5}>
      <Row>
        <Col span={12}>
          <Title level={4}>Offering Filter</Title>
        </Col>
        <Col span={12} className={styles.padding5px}>
          <span onClick={toggleVisiibility}>
            <CloseOutlined style={{ fontSize: "20px", color: "black", float: "right" }} />
          </span>
        </Col>
      </Row>
      <Row>
        <Checkbox onChange={toggleOfferingCodeBLock}>Offering Code</Checkbox>
        <Row className={showOfferingCodeBlock ? styles.offeringFilterField : styles.hidden}>
          <Input
            name="OfferingCode"
            defaultValue=""
            value={filterData.OfferingCode === "*" ? "" : filterData.OfferingCode}
            onChange={handleInputChange}
          />
        </Row>
      </Row>
      <Row>
        <Checkbox onChange={toggleOfferingNameBLock}>Offering Name</Checkbox>
        <Row className={showOfferingNameBlock ? styles.offeringFilterField : styles.hidden}>
          <Input
            name="OfferingName"
            defaultValue=""
            value={filterData.OfferingName === "*" ? "" : filterData.OfferingName}
            onChange={handleInputChange}
          />
        </Row>
      </Row>
      <Row>
        <Checkbox onChange={toggleCreationDateBLock}>Creation Date</Checkbox>
        <Row className={showCreationDateBlock ? styles.offeringFilterField : styles.hidden}>
          <Col span={24}>From</Col>
          <DatePicker value={fromCreationDate} onChange={handleCreationDateChange} format={dateFormat} />
          <Col span={24}>To</Col>
          <DatePicker value={toCreationDate} onChange={handleCreationDateChange} format={dateFormat} />
        </Row>
      </Row>
      <Row>
        <Checkbox onChange={toggleTerminationDateBLock}>Termination Date</Checkbox>
        <Row className={showTerminationDateBlock ? styles.offeringFilterField : styles.hidden}>
          <Col span={24}>From</Col>
          <DatePicker value={fromTerminationDate} onChange={handleTerminationDateChange} format={dateFormat} />
          <Col span={24}>To</Col>
          <DatePicker value={toTerminationDate} onChange={handleTerminationDateChange} format={dateFormat} />
        </Row>
      </Row>
      <Row>
        <Checkbox onChange={toggleIsQuickAdmitBLock}>Is QuickAdmit</Checkbox>
        <Row className={showIsQuickAdmitBlock ? styles.offeringFilterField : styles.hidden}>
          <Select defaultValue="1" style={{ width: 200 }}>
            <Option value="1">Yes</Option>
            <Option value="2">No</Option>
          </Select>
        </Row>
      </Row>
      <Row className={styles.floatRight}>
        <Button
          type="primary"
          className={styles.applyBtn}
          onClick={() => {
            props.onApplyChanges(filterData, filterCount)
          }}
        >
          Apply
        </Button>
      </Row>
    </Col>
  )
}
