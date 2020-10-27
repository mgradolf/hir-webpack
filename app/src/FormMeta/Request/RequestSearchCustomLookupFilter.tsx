import React, { useEffect, useState } from "react"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { Row, Input, Select, Button, Col } from "antd"
import { IDeviceView, useDeviceViews } from "~/Hooks/useDeviceViews"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { IShowPersonLookupModal, showPersonLookupModal } from "~/Store/ModalState"
import { eventBus, EVENT_PERSON_SELECTED } from "~/utils/EventBus"
import { REQUEST_LOOKUP_TYPES } from "~/utils/Constants"

export interface IParamsToBeDispatched {
  NameToDisplay: string
  Params: { [key: string]: string }
}

interface IRequestSearchCustomLookupFilter extends IFilterGenericComponentProps<IFilterFieldComponent> {
  handlePersonLookupModal?: (value: boolean, config?: IShowPersonLookupModal) => void
  key?: any
}
function RequestSearchCustomLookupFilter(props: IRequestSearchCustomLookupFilter) {
  const [selectedValue, setSelectedValue] = useState("")
  const [seletectLookupType, setSeletectLookupType] = useState(REQUEST_LOOKUP_TYPES.ACCOUNT)
  const [mobileView, setMobileView] = useState(false)
  useDeviceViews((deviceViews: IDeviceView) => {
    setMobileView(deviceViews.mobile)
  })

  useEffect(() => {
    eventBus.subscribe(EVENT_PERSON_SELECTED, (person: IParamsToBeDispatched) => {
      setSelectedValue(person.NameToDisplay)
      Object.keys(person.Params).forEach((key) => {
        if (person.Params[key] === "") delete person.Params[key]
      })
      props.filterValueChanged(person.Params)
      console.log("person ", person)
    })
    return () => {
      eventBus.unsubscribe(EVENT_PERSON_SELECTED)
    }
  }, [props])

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
    <Row style={{ marginTop: "10px" }}>
      <Col span={8} {...(mobileView && { xs: { span: 8, offset: 0 } })}>
        <Select
          style={{ width: "100%" }}
          defaultValue={REQUEST_LOOKUP_TYPES.ACCOUNT}
          onChange={(value: string) => {
            props.filterValueChanged({
              PurchaserPersonID: "",
              RecipientPersonID: "",
              PersonID: "",
              AccountID: ""
            })
            setSelectedValue("")
            setSeletectLookupType(value)
          }}
        >
          <Select.Option key="0" value={REQUEST_LOOKUP_TYPES.ACCOUNT}>
            {REQUEST_LOOKUP_TYPES.ACCOUNT}
          </Select.Option>
          <Select.Option key="1" value={REQUEST_LOOKUP_TYPES.PURCHASER}>
            {REQUEST_LOOKUP_TYPES.PURCHASER}
          </Select.Option>
          <Select.Option key="2" value={REQUEST_LOOKUP_TYPES.RECIPIENT}>
            {REQUEST_LOOKUP_TYPES.RECIPIENT}
          </Select.Option>
          <Select.Option key="3" value={REQUEST_LOOKUP_TYPES.ANY}>
            {REQUEST_LOOKUP_TYPES.ANY}
          </Select.Option>
        </Select>
      </Col>
      <Col span={4} xs={8}>
        <Input readOnly value={selectedValue} />
      </Col>
      <Col span={4} xs={8}>
        <Button
          onClick={() => {
            props.handlePersonLookupModal && props.handlePersonLookupModal(true, { type: seletectLookupType })
          }}
        >
          Lookup
        </Button>
      </Col>
    </Row>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    handlePersonLookupModal: (value: boolean, config?: IShowPersonLookupModal) =>
      dispatch(showPersonLookupModal(value, config))
  }
}

export default connect(undefined, mapDispatchToProps)(RequestSearchCustomLookupFilter)
