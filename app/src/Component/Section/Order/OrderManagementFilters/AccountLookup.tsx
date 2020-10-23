import { Button, Col, Form, Input, Row } from "antd"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { IShowPersonLookupModal, showPersonLookupModal } from "~/Store/ModalState"
import { WAITLIST_ENTRIES_LOOKUP_TYPES } from "~/utils/Constants"
import { eventBus, EVENT_PERSON_SELECTED } from "~/utils/EventBus"

interface IAccountLookupForOrderManagement extends IFilterGenericComponentProps<IFilterFieldComponent> {
  handlePersonLookupModal?: (value: boolean, config?: IShowPersonLookupModal) => void
  key?: any
}

interface IParamsToBeDispatched {
  NameToDisplay: string
  Params: { [key: string]: string }
}

function AccountLookupForOrderManagement(props: IAccountLookupForOrderManagement) {
  const [selectedValue, setSelectedValue] = useState("")
  useEffect(() => {
    eventBus.subscribe(EVENT_PERSON_SELECTED, (person: IParamsToBeDispatched) => {
      setSelectedValue(person.NameToDisplay)
      Object.keys(person.Params).forEach((key) => {
        if (person.Params[key] === "") delete person.Params[key]
      })
      props.filterValueChanged(person.Params)
    })
    return () => {
      eventBus.unsubscribe(EVENT_PERSON_SELECTED)
    }
  }, [props])
  return (
    <Form.Item label="Account" labelCol={{ span: 6 }}>
      <Row>
        <Col span={18}>
          <Input value={selectedValue} readOnly />
        </Col>
        <Col span={6}>
          <Button
            onClick={() => {
              props.handlePersonLookupModal &&
                props.handlePersonLookupModal(true, { type: WAITLIST_ENTRIES_LOOKUP_TYPES.ACCOUNT })
            }}
          >
            Lookup
          </Button>
        </Col>
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

export default connect(undefined, mapDispatchToProps)(AccountLookupForOrderManagement)
