import React, { CSSProperties, useState } from "react"
import { Button } from "antd"
import { BaseButtonProps } from "antd/lib/button/button"
import { CustomFormModal, ICustomFormModal } from "~/Component/Common/Modal/FormModal/CustomFormModal"

export interface ICustomFormModalOpenButton extends Omit<ICustomFormModal, "closeModal"> {
  style?: CSSProperties
  buttonProps?: BaseButtonProps
  buttonLabel?: string
}
export const CustomFormModalOpenButton = (props: ICustomFormModalOpenButton) => {
  const { style, buttonProps, buttonLabel, ...CustomFormModalProps } = props
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Button style={props.style} {...props.buttonProps} onClick={() => setShowModal && setShowModal(true)}>
        {props.buttonLabel}
      </Button>

      {showModal && (
        <CustomFormModal
          {...CustomFormModalProps}
          closeModal={() => {
            props.formInstance.resetFields()
            setShowModal(false)
          }}
        />
      )}
    </>
  )
}
