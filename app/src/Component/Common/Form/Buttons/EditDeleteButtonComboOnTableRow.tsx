import React from "react"
import { Button, Col, Row } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { IField } from "~/Component/Common/Form/common"
import { MetaDrivenFormModalOpenButton } from "~/Component/Common/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"

export const EditDeleteButtonComboOnTableRow = (props: {
  valueToBeEdited?: any
  editFormMeta: IField[]
  editFormTitle: string
  editFormInitialValue?: { [key: string]: any }
  editFormDefaultValue?: { [key: string]: any }
  refreshEventName?: string
  editApi: (Params: { [key: string]: any }) => Promise<IApiResponse>
  deleteApi: () => Promise<IApiResponse>
}) => {
  return (
    <Row justify="start" align="middle">
      <Col flex="auto">{props.valueToBeEdited}</Col>
      <Col flex="none">
        <MetaDrivenFormModalOpenButton
          formMeta={props.editFormMeta}
          formTitle={props.editFormTitle}
          initialFormValue={props.editFormInitialValue}
          defaultFormValue={props.editFormDefaultValue}
          formSubmitApi={props.editApi}
          refreshEventName={props.refreshEventName}
          buttonProps={{ type: "ghost", shape: "circle", icon: <EditOutlined /> }}
        />
        <Button
          type="ghost"
          style={{ marginLeft: "5px" }}
          danger
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={() => showDeleteConfirm(props.deleteApi)}
        />
      </Col>
    </Row>
  )
}
