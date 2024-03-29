import React, { CSSProperties, useState } from "react"
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  CopyOutlined,
  MailOutlined,
  UndoOutlined,
  InfoCircleOutlined,
  RightCircleOutlined
} from "@ant-design/icons"
import { Button, Tooltip } from "antd"
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { Redirect } from "react-router"
import { ButtonType } from "antd/lib/button"

export type iconType = "create" | "edit" | "remove" | "close" | "copy" | "email" | "undo" | "info" | "right" | "danger"

export const IconButton = (props: {
  onClick?: () => void
  onClickRemove?: () => Promise<IApiResponse>
  redirectTo?: string
  iconType: iconType
  inProgress?: boolean
  toolTip: string
  disabled?: boolean
  loading?: boolean
  style?: CSSProperties
  buttonType?: ButtonType
}) => {
  const [localLoading, setLocalLoading] = useState(false)
  const [redirectTo, setRedirectTo] = useState<string>()
  let _button: JSX.Element = <></>
  if (props.iconType === "remove") {
    _button = (
      <Button
        style={{ marginRight: "5px", ...props.style }}
        aria-label={props.toolTip}
        icon={<DeleteOutlined />}
        shape="circle"
        danger
        type="primary"
        onClick={() =>
          props.onClickRemove &&
          showDeleteConfirm(() => {
            if (props.onClickRemove) {
              setLocalLoading(true)
              return props.onClickRemove().then((x) => {
                setLocalLoading(false)
                if (x.success && props.redirectTo) {
                  setRedirectTo(props.redirectTo)
                }
                return x
              })
            }
            return Promise.resolve({ code: 200, success: false, error: null, data: null })
          })
        }
        loading={props.loading || localLoading}
        disabled={props.disabled || (props.inProgress !== undefined && !props.inProgress)}
      />
    )
  } else {
    const icons: { [key: string]: JSX.Element } = {
      create: <PlusOutlined />,
      edit: <EditOutlined />,
      close: <CloseOutlined />,
      copy: <CopyOutlined />,
      email: <MailOutlined />,
      undo: <UndoOutlined />,
      info: <InfoCircleOutlined />,
      right: <RightCircleOutlined />,
      danger: <DeleteOutlined />
    }
    _button = (
      <Button
        style={{ marginRight: "5px", ...props.style }}
        aria-label={props.toolTip}
        icon={icons[props.iconType]}
        shape="circle"
        danger={props.iconType === "danger"}
        onClick={props.onClick}
        type={props.buttonType || "primary"}
        loading={props.loading}
        disabled={props.disabled}
      />
    )
  }
  return (
    <>
      {props.iconType === "remove" && redirectTo && <Redirect to={redirectTo} />}
      <Tooltip title={props.toolTip}>{_button}</Tooltip>
    </>
  )
}
