import React from "react"
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { Button, Tooltip } from "antd"
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export type iconType = "create" | "edit" | "remove"

export const CreateEditRemoveIconButton = (props: {
  onClick?: () => void
  onClickRemove?: () => Promise<IApiResponse>
  iconType: iconType
  inProgress?: boolean
  toolTip: string
  disabled?: boolean
  loading?: boolean
}) => {
  let _button: JSX.Element = <></>
  switch (props.iconType) {
    case "create":
      _button = (
        <Button
          style={{ marginRight: "5px" }}
          aria-label={props.toolTip}
          icon={<PlusOutlined />}
          shape="circle"
          onClick={props.onClick}
          type="primary"
          loading={props.loading}
          disabled={props.disabled}
        />
      )
      break
    case "edit":
      _button = (
        <Button
          style={{ marginRight: "5px" }}
          aria-label={props.toolTip}
          icon={<EditOutlined />}
          shape="circle"
          onClick={props.onClick}
          type="primary"
          loading={props.loading}
          disabled={props.disabled}
        />
      )
      break
    case "remove":
      _button = (
        <Button
          style={{ marginRight: "5px" }}
          aria-label={props.toolTip}
          icon={<DeleteOutlined />}
          shape="circle"
          danger
          type="primary"
          onClick={() => props.onClickRemove && showDeleteConfirm(props.onClickRemove)}
          loading={props.loading}
          disabled={props.disabled || (props.inProgress !== undefined && !props.inProgress)}
        />
      )
      break
  }
  return <Tooltip title={props.toolTip}>{_button}</Tooltip>
}
