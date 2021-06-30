import React, { CSSProperties, useState } from "react"
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  CopyOutlined,
  MailOutlined,
  UndoOutlined,
  InfoCircleOutlined
} from "@ant-design/icons"
import { Button, Tooltip } from "antd"
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { Redirect } from "react-router"
import { ButtonType } from "antd/lib/button"

export type iconType = "create" | "edit" | "remove" | "close" | "copy" | "email" | "undo" | "info"

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
      <>
        {redirectTo && <Redirect to={redirectTo} />}
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
                // console.log("props.onClickRemove exist, setLocalLoading to true")
                setLocalLoading(true)
                return props.onClickRemove().then((x) => {
                  setLocalLoading(false)
                  if (x.success && props.redirectTo) {
                    setRedirectTo(props.redirectTo)
                  }
                  // console.log("setLocalLoading to false", x)
                  return x
                })
              }
              return Promise.resolve({ code: 200, success: false, error: null, data: null })
            })
          }
          loading={props.loading || localLoading}
          disabled={props.disabled || (props.inProgress !== undefined && !props.inProgress)}
        />
      </>
    )
  } else {
    const icons: { [key: string]: JSX.Element } = {
      create: <PlusOutlined />,
      edit: <EditOutlined />,
      close: <CloseOutlined />,
      copy: <CopyOutlined />,
      email: <MailOutlined />,
      undo: <UndoOutlined />,
      info: <InfoCircleOutlined />
    }
    _button = (
      <Button
        style={{ marginRight: "5px", ...props.style }}
        aria-label={props.toolTip}
        icon={icons[props.iconType]}
        shape="circle"
        onClick={props.onClick}
        type={props.buttonType || "primary"}
        loading={props.loading}
        disabled={props.disabled}
      />
    )
  }
  return <Tooltip title={props.toolTip}>{_button}</Tooltip>
}
