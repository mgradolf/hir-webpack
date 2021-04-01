import React from "react"
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { Button, Tooltip } from "antd"

export type iconType = "create" | "edit" | "remove"

export const CreateEditRemoveIconButton = (props: {
  onClick: () => void
  iconType: iconType
  inProgress?: boolean
  toolTip: string
  disabled?: boolean
}) => {
  const onClick = () => {
    if (props.iconType === "remove") {
      if (props.inProgress !== undefined && !props.inProgress) {
        props.onClick()
      }
    } else {
      props.onClick()
    }
  }

  let _button: JSX.Element = <></>
  switch (props.iconType) {
    case "create":
      _button = (
        <Button
          aria-label={props.toolTip}
          icon={<PlusOutlined />}
          shape="circle"
          onClick={onClick}
          type="primary"
          disabled={props.disabled}
        />
      )
      break
    case "edit":
      _button = (
        <Button
          aria-label={props.toolTip}
          icon={<EditOutlined />}
          shape="circle"
          onClick={onClick}
          type="primary"
          disabled={props.disabled}
        />
      )
      break
    case "remove":
      _button = (
        <Button
          aria-label={props.toolTip}
          icon={<DeleteOutlined />}
          shape="circle"
          onClick={onClick}
          danger
          type="primary"
          disabled={props.disabled}
        />
      )
      break
  }
  return <Tooltip title={props.toolTip}>{_button}</Tooltip>
}
