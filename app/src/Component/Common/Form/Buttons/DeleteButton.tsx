import React, { CSSProperties } from "react"
import { Button, Modal } from "antd"
import { BaseButtonProps } from "antd/lib/button/button"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { eventBus } from "~/utils/EventBus"

import { ExclamationCircleOutlined } from "@ant-design/icons"

export const DeleteButton = (props: {
  style?: CSSProperties
  buttonProps?: BaseButtonProps
  removeAction(): Promise<IApiResponse>
  warningText?: string
  refreshEventName?: string
}) => {
  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleOutlined />,
      content: props.warningText,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        props.removeAction().then((response) => {
          if (response.success && props.refreshEventName) eventBus.publish(props.refreshEventName)
        })
      },
      onCancel() {
        console.log("Cancel")
      }
    })
  }
  return <Button {...props.buttonProps} onClick={showDeleteConfirm} />
}
