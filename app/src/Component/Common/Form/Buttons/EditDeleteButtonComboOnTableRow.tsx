import React from "react"
import { Button, Col, Row, Tooltip } from "antd"
import { DeleteOutlined, CheckOutlined } from "@ant-design/icons"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { IField } from "~/Component/Common/Form/common"
import { MetaDrivenFormModalOpenButton } from "~/Component/Common/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"
import { PERSON_CONTACT_PEFERRED_POSITION } from "~/utils/Constants"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"

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
  const setPreferred = () => {
    if (props.editFormInitialValue?.SortPosition !== PERSON_CONTACT_PEFERRED_POSITION) {
      const params = props.editFormInitialValue ? props.editFormInitialValue : {}
      params["IsPreferred"] = true
      props.editApi(params).then((response) => {
        if (response && response.success) {
          eventBus.publish(REFRESH_PAGE)
        }
      })
    }
  }

  return (
    <Row justify="start" align="middle">
      <Col flex="auto">{props.valueToBeEdited}</Col>
      <Col flex="none">
        <Tooltip
          title={
            props.editFormInitialValue?.SortPosition === PERSON_CONTACT_PEFERRED_POSITION
              ? "Preferred"
              : "Set Preferred"
          }
        >
          <Button
            type={props.editFormInitialValue?.SortPosition === PERSON_CONTACT_PEFERRED_POSITION ? "primary" : "ghost"}
            style={{ marginRight: "5px" }}
            shape="circle"
            icon={<CheckOutlined />}
            onClick={setPreferred}
          />
        </Tooltip>
        <MetaDrivenFormModalOpenButton
          formMeta={props.editFormMeta}
          formTitle={props.editFormTitle}
          initialFormValue={props.editFormInitialValue}
          defaultFormValue={props.editFormDefaultValue}
          formSubmitApi={props.editApi}
          refreshEventName={props.refreshEventName}
          buttonLabel={"Edit"}
          iconType="edit"
        />
        <Tooltip title="Delete">
          <Button
            type="ghost"
            style={{ marginLeft: "5px" }}
            danger
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(props.deleteApi)}
          />
        </Tooltip>
      </Col>
    </Row>
  )
}
