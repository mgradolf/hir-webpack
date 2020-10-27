import React, { useEffect, useState } from "react"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { Row, Input, Select, Button, Col } from "antd"
import { IDeviceView, useDeviceViews } from "~/Hooks/useDeviceViews"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { IShowPersonLookupModal, showPersonLookupModal } from "~/Store/ModalState"
import { eventBus, EVENT_PERSON_SELECTED } from "~/utils/EventBus"
import { WAITLIST_ENTRIES_LOOKUP_TYPES } from "~/utils/Constants"

export interface IParamsToBeDispatched {
  NameToDisplay: string
  Params: { [key: string]: string }
}

interface IWaitlistSearchCustomLookupFilter extends IFilterGenericComponentProps<IFilterFieldComponent> {
  handlePersonLookupModal?: (value: boolean, config?: IShowPersonLookupModal) => void
  key?: any
}
function WaitlistSearchCustomLookupFilter(props: IWaitlistSearchCustomLookupFilter) {
  const [selectedValue, setSelectedValue] = useState("")
  const [seletectLookupType, setSeletectLookupType] = useState(WAITLIST_ENTRIES_LOOKUP_TYPES.ACCOUNT)
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
    <Row>
      <Col span={4} offset={2} {...(mobileView && { xs: { span: 8, offset: 0 } })}>
        <Select
          style={{ width: "100%" }}
          defaultValue={WAITLIST_ENTRIES_LOOKUP_TYPES.ACCOUNT}
          onChange={(value: string) => {
            props.filterValueChanged({
              RequesterPersonID: "",
              RecipientPersonID: "",
              RequesterRecipientPersonID1: "",
              RequesterRecipientPersonID2: "",
              AccountID: ""
            })
            setSelectedValue("")
            setSeletectLookupType(value)
          }}
        >
          <Select.Option key="0" value={WAITLIST_ENTRIES_LOOKUP_TYPES.ACCOUNT}>
            {WAITLIST_ENTRIES_LOOKUP_TYPES.ACCOUNT}
          </Select.Option>
          <Select.Option key="1" value={WAITLIST_ENTRIES_LOOKUP_TYPES.PURCHASER}>
            {WAITLIST_ENTRIES_LOOKUP_TYPES.PURCHASER}
          </Select.Option>
          <Select.Option key="2" value={WAITLIST_ENTRIES_LOOKUP_TYPES.STUDENT}>
            {WAITLIST_ENTRIES_LOOKUP_TYPES.STUDENT}
          </Select.Option>
          <Select.Option key="3" value={WAITLIST_ENTRIES_LOOKUP_TYPES.PURCHASER_STUDENT}>
            {WAITLIST_ENTRIES_LOOKUP_TYPES.PURCHASER_STUDENT}
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

export default connect(undefined, mapDispatchToProps)(WaitlistSearchCustomLookupFilter)
