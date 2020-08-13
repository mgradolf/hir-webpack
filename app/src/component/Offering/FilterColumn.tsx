import React, { useState } from "react"
import { Col, Row, Checkbox, Input, Select, Button, Typography, DatePicker } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import moment from "moment"
import { CheckboxChangeEvent } from "antd/lib/checkbox"
import styles from "~/component/Offering/FilterColumn.module.scss"

const { Option } = Select
const { Title } = Typography
const { RangePicker } = DatePicker
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
    filterData.FromCreationDate !== ""
      ? moment(filterData.FromCreationDate, dateFormat)
      : moment(new Date(), dateFormat)
  const toCreationDate =
    filterData.ToCreationDate !== "" ? moment(filterData.ToCreationDate, dateFormat) : moment(new Date(), dateFormat)

  const fromTerminationDate =
    filterData.FromTerminationDate !== ""
      ? moment(filterData.FromTerminationDate, dateFormat)
      : moment(new Date(), dateFormat)
  const toTerminationDate =
    filterData.ToTerminationDate !== ""
      ? moment(filterData.ToTerminationDate, dateFormat)
      : moment(new Date(), dateFormat)

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
        FromCreationDate: dateString[0],
        ToCreationDate: dateString[1]
      })
    }
  }

  const handleTerminationDateChange = (dateString: any) => {
    if (dateString !== null) {
      updateFilterData({
        ...filterData,
        FromTerminationDate: dateString[0],
        ToTerminationDate: dateString[1]
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
          <RangePicker
            value={[fromCreationDate, toCreationDate]}
            onChange={handleCreationDateChange}
            format={dateFormat}
          />
        </Row>
      </Row>
      <Row>
        <Checkbox onChange={toggleTerminationDateBLock}>Termination Date</Checkbox>
        <Row className={showTerminationDateBlock ? styles.offeringFilterField : styles.hidden}>
          <RangePicker
            value={[fromTerminationDate, toTerminationDate]}
            onChange={handleTerminationDateChange}
            format={dateFormat}
          />
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
