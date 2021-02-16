import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { Button, Col, Row } from "antd"
import React from "react"
import { IField } from "./common"
import { FormModalOpenButton } from "./FormModalOpenButton"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"

export const EditDeleteButtonComboOnTableRow = (props: {
  valueToBeEdited?: any
  editFormMeta: IField[]
  editFormTitle: string
  editFormInitialValue?: { [key: string]: any }
  editFormDefaultValue?: { [key: string]: any }
  refreshEventName?: string
  editApi: (Params: { [key: string]: any }) => Promise<IApiResponse>
  deleteApi: (Params: { [key: string]: any }) => Promise<IApiResponse>
}) => {
  return (
    <Row justify="start" align="middle">
      <Col flex="auto">{props.valueToBeEdited}</Col>
      <Col flex="none">
        <FormModalOpenButton
          formMeta={props.editFormMeta}
          formTitle={props.editFormTitle}
          initialFormValue={props.editFormInitialValue}
          defaultFormValue={props.editFormDefaultValue}
          formSubmitApi={props.editApi}
          refreshEventName={props.refreshEventName}
          buttonProps={{ type: "ghost", shape: "circle", icon: <EditOutlined /> }}
        />
      </Col>
      <Col flex="none">
        <Button
          type="ghost"
          style={{ marginLeft: "5px" }}
          danger
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={props.deleteApi}
        />
      </Col>
    </Row>
  )
}
