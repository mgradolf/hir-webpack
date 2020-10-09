import React, { useEffect, useState } from "react"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { Row, Input, Select, Col, Form } from "antd"
import { IDeviceView, useDeviceViews } from "~/Hooks/useDeviceViews"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { IShowPersonLookupModal, showPersonLookupModal } from "~/Store/ModalState"
// import { eventBus, EVENT_PERSON_SELECTED } from "~/utils/EventBus"
import { ORDER_MANAGEMENT_PERSON_LOOKUP_TYPES } from "~/utils/Constants"

export interface IParamsToBeDispatched {
  NameToDisplay: string
  Params: { [key: string]: string }
}

interface IWaitlistSearchCustomLookupFilter extends IFilterGenericComponentProps<IFilterFieldComponent> {
  handlePersonLookupModal?: (value: boolean, config?: IShowPersonLookupModal) => void
  key?: any
}
function PersonSelectorForOrderManagement(props: IWaitlistSearchCustomLookupFilter) {
  const [selectedInputType, setSelectedInputType] = useState("number")
  const [selectedKey, setSelectedKey] = useState(ORDER_MANAGEMENT_PERSON_LOOKUP_TYPES.BUYER.key)
  const [seletectLookupType, setSeletectLookupType] = useState(ORDER_MANAGEMENT_PERSON_LOOKUP_TYPES.BUYER.name)
  const [mobileView, setMobileView] = useState(false)
  useDeviceViews((deviceViews: IDeviceView) => {
    setMobileView(deviceViews.mobile)
  })

  useEffect(() => {
    switch (seletectLookupType) {
      case ORDER_MANAGEMENT_PERSON_LOOKUP_TYPES.BUYER.name:
        setSelectedKey(ORDER_MANAGEMENT_PERSON_LOOKUP_TYPES.BUYER.key)
        setSelectedInputType("number")
        break
      case ORDER_MANAGEMENT_PERSON_LOOKUP_TYPES.STUDENT.name:
        setSelectedKey(ORDER_MANAGEMENT_PERSON_LOOKUP_TYPES.STUDENT.key)
        setSelectedInputType("number")
        break
      case ORDER_MANAGEMENT_PERSON_LOOKUP_TYPES.BILLED_TO.name:
        setSelectedKey(ORDER_MANAGEMENT_PERSON_LOOKUP_TYPES.BILLED_TO.key)
        setSelectedInputType("text")
        break
    }
  }, [seletectLookupType])
  // useEffect(() => {
  //   eventBus.subscribe(EVENT_PERSON_SELECTED, (person: IParamsToBeDispatched) => {
  //     Object.keys(person.Params).forEach((key) => {
  //       if (person.Params[key] === "") delete person.Params[key]
  //     })
  //     props.filterValueChanged(person.Params)
  //     console.log("person ", person)
  //   })
  //   return () => {
  //     eventBus.unsubscribe(EVENT_PERSON_SELECTED)
  //   }
  // }, [props])

  return props.isChecked ? (
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
      <Row key={props.key}>
        <Col span={4} offset={2} {...(mobileView && { xs: { span: 8, offset: 0 } })}>
          <Select
            style={{ width: "100%" }}
            defaultValue={ORDER_MANAGEMENT_PERSON_LOOKUP_TYPES.BUYER.name}
            onChange={(value: string) => {
              props.filterValueChanged({
                PersonID: "",
                StudentName: "",
                BilledPersonName: ""
              })
              setSeletectLookupType(value)
            }}
          >
            <Select.Option key="0" value={ORDER_MANAGEMENT_PERSON_LOOKUP_TYPES.BUYER.name}>
              {ORDER_MANAGEMENT_PERSON_LOOKUP_TYPES.BUYER.name}
            </Select.Option>
            <Select.Option key="2" value={ORDER_MANAGEMENT_PERSON_LOOKUP_TYPES.STUDENT.name}>
              {ORDER_MANAGEMENT_PERSON_LOOKUP_TYPES.STUDENT.name}
            </Select.Option>
            <Select.Option key="3" value={ORDER_MANAGEMENT_PERSON_LOOKUP_TYPES.BILLED_TO.name}>
              {ORDER_MANAGEMENT_PERSON_LOOKUP_TYPES.BILLED_TO.name}
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
        {/* <Col span={4} xs={8}>
        <Button
          onClick={() => {
            props.handlePersonLookupModal && props.handlePersonLookupModal(true, { type: seletectLookupType })
          }}
        >
          Lookup
        </Button>
      </Col> */}
      </Row>
    </Form.Item>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    handlePersonLookupModal: (value: boolean, config?: IShowPersonLookupModal) =>
      dispatch(showPersonLookupModal(value, config))
  }
}

export default connect(undefined, mapDispatchToProps)(PersonSelectorForOrderManagement)
