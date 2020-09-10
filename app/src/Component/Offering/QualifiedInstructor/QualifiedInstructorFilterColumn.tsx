import React, { useState, useEffect } from "react"
import { Col, Row, Checkbox, Input, Select, Button, Typography } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import { CheckboxChangeEvent } from "antd/lib/checkbox"
import styles from "~/Component/Offering/QualifiedInstructor/QualifiedInstructorFilterColumn.module.scss"
import { getInstructorTypes } from "~/ApiServices/Service/RefLookupService"
import { ColProps } from "antd/lib/col"

const { Title } = Typography

const layout = {
  label: {
    md: 24,
    lg: 24,
    xl: 10,
    xxl: 10,
    sm: 24,
    xs: 24
  },
  input: {
    md: 20,
    lg: 20,
    xl: 14,
    xxl: 14,
    sm: 20,
    xs: 20
  }
}

function LabelCol(props: ColProps) {
  return <Col {...layout.label} {...props} />
}

function InputCol(props: ColProps) {
  return <Col {...layout.input} {...props} />
}

export interface IFilterValues {
  LastName: string
  FirstName: string
  FacultySerialNum: string
  InstructorTypeID: string
}

type ISelectName = "InstructorTypeID"

interface IFilterColumnProps {
  visible: boolean
  toggleVisiibility: () => void
  onApplyChanges: (newValues: IFilterValues, appliedFilterCount: number) => void
  data: IFilterValues
}

export function FilterColumn(props: IFilterColumnProps) {
  const [instructorTypes, setInstructorTypes] = useState<Array<any>>([])

  useEffect(() => {
    ;(async () => {
      const response = await getInstructorTypes()
      if (response && response.data && Array.isArray(response.data)) {
        setInstructorTypes(response.data)
      }
    })()
  }, [])

  const { visible, toggleVisiibility, data } = props
  const [filterData, updateFilterData] = useState<IFilterValues>(data)

  const [showLastNameBlock, setLastNameBLockVisible] = useState<boolean>(data.LastName !== "")
  const [showFirstNameBlock, setFirstNameBLockVisible] = useState<boolean>(data.FirstName !== "")
  const [showInstructorTypeBlock, setInstructorTypeBLockVisible] = useState<boolean>(data.InstructorTypeID !== "")
  const [showFacultySerialNumBlock, setFacultySerialNumBLockVisible] = useState<boolean>(data.FacultySerialNum !== "")

  const filterCount = [showLastNameBlock, showFirstNameBlock, showFirstNameBlock, showFacultySerialNumBlock].filter(
    Boolean
  ).length

  const toggleLastNameBLock = (event: CheckboxChangeEvent) => {
    setLastNameBLockVisible(!showLastNameBlock)
    updateFilterData({ ...filterData, LastName: event.target.checked ? filterData.LastName : "" })
  }

  const toggleFirstNameBLock = (event: CheckboxChangeEvent) => {
    setFirstNameBLockVisible(!showFirstNameBlock)
    updateFilterData({ ...filterData, FirstName: event.target.checked ? filterData.FirstName : "" })
  }

  const toggleFacultySerialNumBLock = (event: CheckboxChangeEvent) => {
    setFacultySerialNumBLockVisible(!showFacultySerialNumBlock)
    updateFilterData({ ...filterData, FacultySerialNum: event.target.checked ? filterData.FacultySerialNum : "" })
  }

  const toggleInstructorTypeBLock = (event: CheckboxChangeEvent) => {
    setInstructorTypeBLockVisible(!showInstructorTypeBlock)
    updateFilterData({ ...filterData, InstructorTypeID: event.target.checked ? filterData.InstructorTypeID : "" })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFilterData({
      ...filterData,
      [event.target.name as keyof IFilterValues]: event.target.value
    })
  }

  const onChangeSelect = (selectName: ISelectName) => {
    return (val: string) =>
      updateFilterData({
        ...filterData,
        [selectName]: val
      })
  }

  return (
    <Col className={visible ? `gutter-row ${styles.offeringInstructorFilter}` : styles.hidden} xs={24} sm={24} md={12}>
      <Row>
        <Col span={12}>
          <Title level={4}>Instructor Filter</Title>
        </Col>
        <Col span={12} className={styles.padding5px}>
          <CloseOutlined onClick={toggleVisiibility} style={{ fontSize: "20px", color: "black", float: "right" }} />
        </Col>
      </Row>
      <Row className={styles.filterRow}>
        <LabelCol>
          <Checkbox checked={showFacultySerialNumBlock} onChange={toggleFacultySerialNumBLock}>
            Instructor ID
          </Checkbox>
        </LabelCol>
        <InputCol className={showFacultySerialNumBlock ? styles.offeringFilterField : styles.hidden}>
          <Input
            name="FacultySerialNum"
            defaultValue=""
            value={filterData.FacultySerialNum === "*" ? "" : filterData.FacultySerialNum}
            onChange={handleInputChange}
          />
        </InputCol>
      </Row>
      <Row className={styles.filterRow}>
        <LabelCol>
          <Checkbox checked={showLastNameBlock} onChange={toggleLastNameBLock}>
            Last Name
          </Checkbox>
        </LabelCol>
        <InputCol className={showLastNameBlock ? styles.offeringInstructorFilterFieldModal : styles.hidden}>
          <Input
            name="LastName"
            defaultValue=""
            value={filterData.LastName === "*" ? "" : filterData.LastName}
            onChange={handleInputChange}
          />
        </InputCol>
      </Row>
      <Row className={styles.filterRow}>
        <LabelCol>
          <Checkbox checked={showFirstNameBlock} onChange={toggleFirstNameBLock}>
            First Name
          </Checkbox>
        </LabelCol>
        <InputCol className={showFirstNameBlock ? styles.offeringInstructorFilterFieldModal : styles.hidden}>
          <Input
            name="FirstName"
            defaultValue=""
            value={filterData.FirstName === "*" ? "" : filterData.FirstName}
            onChange={handleInputChange}
          />
        </InputCol>
      </Row>
      {instructorTypes.length > 0 && (
        <Row className={styles.filterRow}>
          <LabelCol>
            <Checkbox checked={showInstructorTypeBlock} onChange={toggleInstructorTypeBLock}>
              Instructor Type
            </Checkbox>
          </LabelCol>
          <InputCol className={showInstructorTypeBlock ? styles.offeringInstructorFilterFieldModal : styles.hidden}>
            <Select
              style={{ width: 200 }}
              value={filterData.InstructorTypeID}
              onChange={onChangeSelect("InstructorTypeID")}
            >
              {instructorTypes.map((x) => {
                return (
                  <Select.Option key={x.ID} value={x.ID}>
                    {x.Name}
                  </Select.Option>
                )
              })}
            </Select>
          </InputCol>
        </Row>
      )}
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
