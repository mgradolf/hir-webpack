import React, { useState } from "react"
import {
  IFilterFieldObject,
  IFilterGenericComponentProps,
  InputCol,
  LabelCol
} from "~/Component/Common/SearchFilters/common"
import styles from "~/Component/Common/SearchFilters/SearchFilters.module.scss"
import { Row, Checkbox, Input, Select, Button, Col } from "antd"
import { IDeviceView, useDeviceViews } from "~/Hooks/useDeviceViews"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { IShowPersonLookupModal, showPersonLookupModal } from "~/Store/ModalState"

export const LOOKUP_TYPES = {
  ACCOUNT: "Account",
  PURCHASER: "Purchaser",
  STUDENT: "Student",
  PURCHASER_STUDENT: "Purchaser/Student"
}

interface IWaitlistSearchCustomLookupFilter extends IFilterGenericComponentProps<IFilterFieldObject> {
  handlePersonLookupModal?: (value: boolean, config?: IShowPersonLookupModal) => void
  key?: any
}
function WaitlistSearchCustomLookupFilter(props: IWaitlistSearchCustomLookupFilter) {
  const [selectedValue, setSelectedValue] = useState("Rowan")
  const [mobileView, setMobileView] = useState(false)
  useDeviceViews((deviceViews: IDeviceView) => {
    setMobileView(deviceViews.mobile)
  })

  return props.isChecked ? (
    <Row>
      <LabelCol>
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
      </InputCol>
    </Row>
  ) : (
    <Row key={props.key}>
      <Col span={4} offset={2} {...(mobileView && { xs: { span: 8, offset: 0 } })}>
        <Select style={{ width: "100%" }} defaultValue="account">
          <Select.Option key="0" value={LOOKUP_TYPES.ACCOUNT}>
            {LOOKUP_TYPES.ACCOUNT}
          </Select.Option>
          <Select.Option key="1" value={LOOKUP_TYPES.PURCHASER}>
            {LOOKUP_TYPES.PURCHASER}
          </Select.Option>
          <Select.Option key="2" value={LOOKUP_TYPES.STUDENT}>
            {LOOKUP_TYPES.STUDENT}
          </Select.Option>
          <Select.Option key="3" value={LOOKUP_TYPES.PURCHASER_STUDENT}>
            {LOOKUP_TYPES.PURCHASER_STUDENT}
          </Select.Option>
        </Select>
      </Col>
      <Col span={4} xs={8}>
        <Input readOnly value={selectedValue} />
      </Col>
      <Col span={4} xs={8}>
        <Button
          onClick={() => {
            props.handlePersonLookupModal &&
              props.handlePersonLookupModal(true, {
                type: LOOKUP_TYPES.ACCOUNT,
                onSelectPerson: (id: number) => {
                  setSelectedValue("Adam")
                  props.handlePersonLookupModal && props.handlePersonLookupModal(false)
                }
              })
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
