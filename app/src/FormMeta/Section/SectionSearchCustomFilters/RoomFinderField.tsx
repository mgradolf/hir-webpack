import { Input, Row, Form } from "antd"

import React from "react"
import { IFilterGenericComponentProps, IFilterFieldComponent } from "~/Component/Common/SearchFilters/common"
import RoomFinder from "~/Component/Section/RoomFinder"
import { IRoom } from "~/Component/Section/RoomFinder/RoomFinderModal"

function RoomFinderField(props: IFilterGenericComponentProps<IFilterFieldComponent> & { key: number }) {
  return (
    <Row>
      <Form.Item className="hidden" name={props.fieldName}>
        <Input />
      </Form.Item>
      <RoomFinder
        onSelectRoom={(room: IRoom) => {
          props.formInstance.setFieldsValue({ [props.fieldName]: room[props.fieldName] })
        }}
      />
    </Row>
  )
}

export default RoomFinderField
