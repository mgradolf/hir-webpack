import React from "react"
import { Button, Col, Row } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { IField } from "~/Component/Common/Form/common"
import { FormModalOpenButton } from "~/Component/Common/Form/FormModalOpenButton"

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
        {/* </Col>
      <Col flex="none"> */}
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
