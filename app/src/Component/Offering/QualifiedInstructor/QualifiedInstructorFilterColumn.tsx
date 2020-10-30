import React, { useState } from "react"
import { Col, Row, Checkbox, Input, Select, Button, Typography, DatePicker } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import { CheckboxChangeEvent } from "antd/lib/checkbox"
import styles from "~/Component/Offering/QualifiedInstructor/QualifiedInstructorFilterColumn.module.scss"
import { ColProps } from "antd/lib/col"
import { RecordType } from "~/Component/Common/ResponsiveTable"
import { useQualifiedInstructorFilterData } from "~/Hooks/Offering/QualifiedInstructors"
import moment from "moment"
import { searchOffering } from "~/ApiServices/Service/OfferingService"
import { DATE_FORMAT } from "~/utils/Constants"

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

export interface IFilterValues extends RecordType {
  LastName: string
  FirstName: string
  FacultySerialNum: string
  InstructorTypeID: string
  TelephoneNumber: string
  IsDeceased: string
  PostalCode: string
  CountryCodeID: string
  Birthday: string
  InstitutionStatusCodeID: string
  OrganizationID: string
  TaughtOfferingID: string
  GenderTypeID: string
  AvailableForSectionID: string
  RegionCodeID: string
  EthnicityTypeID: string
  GovID: string
  LastTaughtDate: string
  CanTeachOfferingID: string
}

const initialVisibility = {
  LastName: false,
  FirstName: false,
  FacultySerialNum: false,
  InstructorTypeID: false,
  TelephoneNumber: false,
  IsDeceased: false,
  PostalCode: false,
  CountryCodeID: false,
  Birthday: false,
  InstitutionStatusCodeID: false,
  OrganizationID: false,
  TaughtOfferingID: false,
  GenderTypeID: false,
  AvailableForSectionID: false,
  RegionCodeID: false,
  EthnicityTypeID: false,
  GovID: false,
  LastTaughtDate: false,
  CanTeachOfferingID: false
}

type IVisibility = {
  [key in keyof IFilterValues]: boolean
}

type ISearchOptions = {
  CanTeachOfferingID: Array<any>
  TaughtOfferingID: Array<any>
  AvailableForSectionID: Array<any>
}

interface IFilterColumnProps {
  visible: boolean
  hideFilters: () => void
  onApplyChanges: (newValues: IFilterValues, appliedFilterCount: number) => void
  data: IFilterValues
}

export function FilterColumn(props: IFilterColumnProps) {
  const [
    instructorTypes,
    genderTypes,
    regionCodes,
    ethnicityTypes,
    organizations,
    countries,
    institutionStatuses
  ] = useQualifiedInstructorFilterData()
  const { visible, hideFilters, data } = props
  const [searchOptions, updateSearchOptions] = useState<ISearchOptions>({
    AvailableForSectionID: [],
    CanTeachOfferingID: [],
    TaughtOfferingID: []
  })

  const [filterData, updateFilterData] = useState<IFilterValues>(data)
  const [visibility, updateVisibility] = useState<IVisibility>(
    Object.keys(data).reduce(
      (visibilityRecord, key) => ({ ...visibilityRecord, [key]: Boolean(data[key] !== "") }),
      initialVisibility
    )
  )

  const filterCount = Object.values(visibility).filter(Boolean).length

  const toggleFilterBlockVisibility = (name: keyof IFilterValues) => (event: CheckboxChangeEvent) => {
    updateVisibility({ ...visibility, [name]: !visibility[name] })
    updateFilterData({ ...filterData, [name]: event.target.checked ? filterData[name] : "" })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFilterData({
      ...filterData,
      [event.target.name as keyof IFilterValues]: event.target.value
    })
  }

  const onChangeSelect = (selectName: keyof IFilterValues) => (val: string) => {
    updateFilterData({
      ...filterData,
      [selectName]: val
    })
  }

  const onChangeDate = (name: keyof IFilterValues) => (dateString: any) => {
    if (dateString !== null) {
      updateFilterData({
        ...filterData,
        [name]: dateString
      })
    }
  }

  const handleSearchOffering = (fieldName: keyof ISearchOptions) => async (value: string) => {
    if (value) {
      const res = await searchOffering({ OfferingCode: value + "*" })
      updateSearchOptions({ ...searchOptions, [fieldName]: res.data })
    } else {
      updateSearchOptions({ ...searchOptions, [fieldName]: [] })
    }
  }

  return (
    <Col className={visible ? `gutter-row ${styles.offeringInstructorFilter}` : "hidden"} xs={24} sm={24} md={12}>
      <Row>
        <Col span={12}>
          <Title level={4}>Instructor Filter</Title>
        </Col>
        <Col span={12} className={styles.padding5px}>
          <CloseOutlined onClick={hideFilters} style={{ fontSize: "20px", color: "black", float: "right" }} />
        </Col>
      </Row>
      <Row className={styles.filterRow}>
        <LabelCol>
          <Checkbox
            name=""
            checked={visibility.FacultySerialNum}
            onChange={toggleFilterBlockVisibility("FacultySerialNum")}
          >
            Instructor ID
          </Checkbox>
        </LabelCol>
        <InputCol className={visibility.FacultySerialNum ? styles.offeringFilterField : "hidden"}>
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
          <Checkbox checked={visibility.LastName} onChange={toggleFilterBlockVisibility("LastName")}>
            Last Name
          </Checkbox>
        </LabelCol>
        <InputCol className={visibility.LastName ? styles.offeringInstructorFilterFieldModal : "hidden"}>
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
          <Checkbox checked={visibility.FirstName} onChange={toggleFilterBlockVisibility("FirstName")}>
            First Name
          </Checkbox>
        </LabelCol>
        <InputCol className={visibility.FirstName ? styles.offeringInstructorFilterFieldModal : "hidden"}>
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
            <Checkbox checked={visibility.InstructorTypeID} onChange={toggleFilterBlockVisibility("InstructorTypeID")}>
              Instructor Type
            </Checkbox>
          </LabelCol>
          <InputCol className={visibility.InstructorTypeID ? styles.offeringInstructorFilterFieldModal : "hidden"}>
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
      <Row className={styles.filterRow}>
        <LabelCol>
          <Checkbox
            checked={visibility.CanTeachOfferingID}
            onChange={toggleFilterBlockVisibility("CanTeachOfferingID")}
          >
            Qualified to Teach Offering
          </Checkbox>
        </LabelCol>
        <InputCol className={visibility.CanTeachOfferingID ? styles.offeringInstructorFilterFieldModal : "hidden"}>
          <Select
            style={{ width: 200 }}
            showSearch
            value={filterData.CanTeachOfferingID}
            placeholder={"ML-110-4"}
            onChange={onChangeSelect("CanTeachOfferingID")}
            onSearch={handleSearchOffering("CanTeachOfferingID")}
            defaultActiveFirstOption={false}
            notFoundContent={null}
          >
            {searchOptions.CanTeachOfferingID.map((o) => (
              <Select.Option key={o.OfferingCode} value={o.OfferingID}>
                {o.OfferingCode}
              </Select.Option>
            ))}
          </Select>
        </InputCol>
      </Row>
      <Row className={styles.filterRow}>
        <LabelCol>
          <Checkbox checked={visibility.TaughtOfferingID} onChange={toggleFilterBlockVisibility("TaughtOfferingID")}>
            Taught Offering
          </Checkbox>
        </LabelCol>
        <InputCol className={visibility.TaughtOfferingID ? styles.offeringInstructorFilterFieldModal : "hidden"}>
          <Select
            style={{ width: 200 }}
            showSearch
            value={filterData.TaughtOfferingID}
            placeholder={"ML-110-4"}
            onChange={onChangeSelect("TaughtOfferingID")}
            onSearch={handleSearchOffering("TaughtOfferingID")}
            defaultActiveFirstOption={false}
            notFoundContent={null}
          >
            {searchOptions.TaughtOfferingID.map((o) => (
              <Select.Option key={o.OfferingCode} value={o.OfferingID}>
                {o.OfferingCode}
              </Select.Option>
            ))}
          </Select>
        </InputCol>
      </Row>
      {genderTypes.length > 0 && (
        <Row className={styles.filterRow}>
          <LabelCol>
            <Checkbox checked={visibility.GenderTypeID} onChange={toggleFilterBlockVisibility("GenderTypeID")}>
              Gender
            </Checkbox>
          </LabelCol>
          <InputCol className={visibility.GenderTypeID ? styles.offeringInstructorFilterFieldModal : "hidden"}>
            <Select style={{ width: 200 }} value={filterData.GenderTypeID} onChange={onChangeSelect("GenderTypeID")}>
              {genderTypes.map((x) => {
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
      {regionCodes.length > 0 && (
        <Row className={styles.filterRow}>
          <LabelCol>
            <Checkbox checked={visibility.RegionCodeID} onChange={toggleFilterBlockVisibility("RegionCodeID")}>
              Region
            </Checkbox>
          </LabelCol>
          <InputCol className={visibility.RegionCodeID ? styles.offeringInstructorFilterFieldModal : "hidden"}>
            <Select style={{ width: 200 }} value={filterData.RegionCodeID} onChange={onChangeSelect("RegionCodeID")}>
              {regionCodes.map((x) => {
                return (
                  <Select.Option key={x.ID} value={x.ID}>
                    {x.Description}
                  </Select.Option>
                )
              })}
            </Select>
          </InputCol>
        </Row>
      )}
      {ethnicityTypes.length > 0 && (
        <Row className={styles.filterRow}>
          <LabelCol>
            <Checkbox checked={visibility.EthnicityTypeID} onChange={toggleFilterBlockVisibility("EthnicityTypeID")}>
              Ethnicity
            </Checkbox>
          </LabelCol>
          <InputCol className={visibility.EthnicityTypeID ? styles.offeringInstructorFilterFieldModal : "hidden"}>
            <Select
              style={{ width: 200 }}
              value={filterData.EthnicityTypeID}
              onChange={onChangeSelect("EthnicityTypeID")}
            >
              {ethnicityTypes.map((x) => {
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
      {organizations.length > 0 && (
        <Row>
          <LabelCol>
            <Checkbox checked={visibility.OrganizationID} onChange={toggleFilterBlockVisibility("OrganizationID")}>
              Department
            </Checkbox>
          </LabelCol>
          <InputCol className={visibility.OrganizationID ? styles.offeringFilterField : "hidden"}>
            <Select style={{ width: 250 }} onChange={onChangeSelect("OrganizationID")}>
              {organizations.map((x) => {
                return (
                  <Select.Option key={x.OrganizationTypeID} value={x.OrganizationTypeID}>
                    {x.Name}
                  </Select.Option>
                )
              })}
            </Select>
          </InputCol>
        </Row>
      )}
      {countries.length > 0 && (
        <Row className={styles.filterRow}>
          <LabelCol>
            <Checkbox checked={visibility.CountryCodeID} onChange={toggleFilterBlockVisibility("CountryCodeID")}>
              Country
            </Checkbox>
          </LabelCol>
          <InputCol className={visibility.CountryCodeID ? styles.offeringInstructorFilterFieldModal : "hidden"}>
            <Select style={{ width: 200 }} value={filterData.CountryCodeID} onChange={onChangeSelect("CountryCodeID")}>
              {countries.map((x) => {
                return (
                  <Select.Option key={x.ID} value={x.ID}>
                    {x.Description}
                  </Select.Option>
                )
              })}
            </Select>
          </InputCol>
        </Row>
      )}
      <Row className={styles.filterRow}>
        <LabelCol>
          <Checkbox checked={visibility.Birthday} onChange={toggleFilterBlockVisibility("Birthday")}>
            Birthday
          </Checkbox>
        </LabelCol>
        <InputCol className={visibility.Birthday ? styles.offeringInstructorFilterFieldModal : "hidden"}>
          <DatePicker
            allowClear
            value={filterData.Birthday ? moment(filterData.Birthday) : undefined}
            onChange={onChangeDate("Birthday")}
            format={DATE_FORMAT}
          />
        </InputCol>
      </Row>
      <Row className={styles.filterRow}>
        <LabelCol>
          <Checkbox
            name="TelephoneNumber"
            checked={visibility.TelephoneNumber}
            onChange={toggleFilterBlockVisibility("TelephoneNumber")}
          >
            Telephone Number
          </Checkbox>
        </LabelCol>
        <InputCol className={visibility.TelephoneNumber ? styles.offeringFilterField : "hidden"}>
          <Input
            name="TelephoneNumber"
            defaultValue=""
            value={filterData.TelephoneNumber === "*" ? "" : filterData.TelephoneNumber}
            onChange={handleInputChange}
          />
        </InputCol>
      </Row>
      <Row className={styles.filterRow}>
        <LabelCol>
          <Checkbox checked={visibility.LastTaughtDate} onChange={toggleFilterBlockVisibility("LastTaughtDate")}>
            Last Taught Date
          </Checkbox>
        </LabelCol>
        <InputCol className={visibility.LastTaughtDate ? styles.offeringInstructorFilterFieldModal : "hidden"}>
          <DatePicker
            allowClear
            value={filterData.LastTaughtDate ? moment(filterData.LastTaughtDate) : undefined}
            onChange={onChangeDate("LastTaughtDate")}
            format={DATE_FORMAT}
          />
        </InputCol>
      </Row>
      <Row className={styles.filterRow}>
        <LabelCol>
          <Checkbox
            name="PostalCode"
            checked={visibility.PostalCode}
            onChange={toggleFilterBlockVisibility("PostalCode")}
          >
            Postal Code
          </Checkbox>
        </LabelCol>
        <InputCol className={visibility.PostalCode ? styles.offeringFilterField : "hidden"}>
          <Input
            name="PostalCode"
            defaultValue=""
            value={filterData.PostalCode === "*" ? "" : filterData.PostalCode}
            onChange={handleInputChange}
          />
        </InputCol>
      </Row>
      <Row className={styles.filterRow}>
        <LabelCol>
          <Checkbox name="GovID" checked={visibility.GovID} onChange={toggleFilterBlockVisibility("GovID")}>
            Gov ID
          </Checkbox>
        </LabelCol>
        <InputCol className={visibility.GovID ? styles.offeringFilterField : "hidden"}>
          <Input
            name="GovID"
            defaultValue=""
            value={filterData.PostalCode === "*" ? "" : filterData.GovID}
            onChange={handleInputChange}
          />
        </InputCol>
      </Row>
      <Row>
        <LabelCol>
          <Checkbox checked={visibility.IsDeceased} onChange={toggleFilterBlockVisibility("IsDeceased")}>
            Is Deceased
          </Checkbox>
        </LabelCol>
        <InputCol className={visibility.IsDeceased ? styles.offeringFilterField : "hidden"}>
          <Select style={{ width: 250 }} value={filterData.IsDeceased} onChange={onChangeSelect("IsDeceased")}>
            <Select.Option value="true">Yes</Select.Option>
            <Select.Option value="false">No</Select.Option>
          </Select>
        </InputCol>
      </Row>
      {institutionStatuses.length > 0 && (
        <Row className={styles.filterRow}>
          <LabelCol>
            <Checkbox
              checked={visibility.InstitutionStatusCodeID}
              onChange={toggleFilterBlockVisibility("InstitutionStatusCodeID")}
            >
              Status
            </Checkbox>
          </LabelCol>
          <InputCol
            className={visibility.InstitutionStatusCodeID ? styles.offeringInstructorFilterFieldModal : "hidden"}
          >
            <Select
              style={{ width: 200 }}
              value={filterData.InstitutionStatusCodeID}
              onChange={onChangeSelect("InstitutionStatusCodeID")}
            >
              {institutionStatuses.map((x) => {
                return (
                  <Select.Option key={x.ID} value={x.ID}>
                    {x.Description}
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
