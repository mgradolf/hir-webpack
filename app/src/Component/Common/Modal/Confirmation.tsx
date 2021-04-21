import { message, Modal } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import React from "react"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export const showDeleteConfirm = (
  remove: () => Promise<IApiResponse>,
  success = "Delete Successfull",
  error = "Delete Unsuccessfull",
  title = "Are you sure to delete this?",
  warningText = ""
) => {
  Modal.confirm({
    title: title,
    icon: <ExclamationCircleOutlined />,
    content: warningText,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      remove().then((result: any) => {
        result.success
          ? message.success(success, 2)
          : message.error(typeof result.error === "string" ? result.error : error, 2)
      })
    },
    onCancel() {
      console.log("Cancel")
    }
  })
}

export const showConfirm = (
  confirm: () => Promise<IApiResponse>,
  success = "Successfull",
  error = "Unsuccessfull",
  title = "A person with this information already exists.  Do you really want to create a new person with this information?",
  warningText = ""
) => {
  Modal.confirm({
    title: title,
    icon: <ExclamationCircleOutlined />,
    content: warningText,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      confirm().then((result: any) => {
        result.success
          ? message.success(success, 2)
          : message.error(typeof result.error === "string" ? result.error : error, 2)
      })
    },
    onCancel() {
      console.log("Cancel")
    }
  })
}
