import React, { useEffect, useState } from "react"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { Row, Input, Select, Col, Form } from "antd"
import { IDeviceView, useDeviceViews } from "~/Hooks/useDeviceViews"

export const PERSON_LOOKUP_TYPES = {
  PURCHASER: {
    name: "Purchaser",
    key: "PersonID"
  },
  STUDENT: {
    name: "Student",
    key: "StudentName"
  }
}

export interface IParamsToBeDispatched {
  NameToDisplay: string
  Params: { [key: string]: string }
}

export default function PersonSelector(props: IFilterGenericComponentProps<IFilterFieldComponent> & { key: any }) {
  const [selectedInputType, setSelectedInputType] = useState("number")
  const [selectedKey, setSelectedKey] = useState(PERSON_LOOKUP_TYPES.PURCHASER.key)
  const [seletectLookupType, setSeletectLookupType] = useState(PERSON_LOOKUP_TYPES.PURCHASER.name)
  const [mobileView, setMobileView] = useState(false)
  useDeviceViews((deviceViews: IDeviceView) => {
    setMobileView(deviceViews.mobile)
  })

  useEffect(() => {
    switch (seletectLookupType) {
      case PERSON_LOOKUP_TYPES.PURCHASER.name:
        setSelectedKey(PERSON_LOOKUP_TYPES.PURCHASER.key)
        setSelectedInputType("number")
        break
      case PERSON_LOOKUP_TYPES.STUDENT.name:
        setSelectedKey(PERSON_LOOKUP_TYPES.STUDENT.key)
        setSelectedInputType("number")
        break
    }
  }, [seletectLookupType])

  return props.isCheckeble ? (
    <Row>
      {/* <LabelCol>
        <Checkbox checked={props.show} onChange={props.toggleCheckboxHandler}>
          {props.label}
        </Checkbox>
      </LabelCol>
      <InputCol className={props.show ? styles.offeringFilterField : "hidden"}>
        <Input
          aria-label={props.ariaLabel}
          name={props.fieldName}
          type={props.inputType.toLowerCase()}
          defaultValue={props.defaultValue}
          value={props.value === "*" ? "" : props.value}
          onChange={(e) => props.filterValueChanged(props.fieldName, e.target.value)}
        />
      </InputCol> */}
    </Row>
  ) : (
    <Form.Item>
      <Row>
        <Col span={4} offset={2} {...(mobileView && { xs: { span: 8, offset: 0 } })}>
          <Select
            style={{ width: "100%" }}
            defaultValue={PERSON_LOOKUP_TYPES.PURCHASER.name}
            onChange={(value: string) => {
              props.filterValueChanged({
                PersonID: "",
                StudentName: "",
                BilledPersonName: ""
              })
              setSeletectLookupType(value)
            }}
          >
            <Select.Option key="0" value={PERSON_LOOKUP_TYPES.PURCHASER.name}>
              {PERSON_LOOKUP_TYPES.PURCHASER.name}
            </Select.Option>
            <Select.Option key="2" value={PERSON_LOOKUP_TYPES.STUDENT.name}>
              {PERSON_LOOKUP_TYPES.STUDENT.name}
            </Select.Option>
          </Select>
        </Col>
        <Col span={4} xs={8}>
          <Input
            id="personSelectorValue"
            type={selectedInputType}
            allowClear
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              e.persist()
              props.filterValueChanged({ [selectedKey]: e.target.value })
            }}
          />
        </Col>
      </Row>
    </Form.Item>
  )
}
