import React, { CSSProperties, useState } from "react"
import { Button } from "antd"
import { BaseButtonProps } from "antd/lib/button/button"
import { CustomFormModal, ICustomFormModal } from "~/Component/Common/Modal/FormModal/CustomFormModal"
import { CreateEditRemoveIconButton, iconType } from "~/Component/Common/Form/Buttons/CreateEditRemoveIconButton"

export interface ICustomFormModalOpenButton extends Omit<ICustomFormModal, "closeModal"> {
  style?: CSSProperties
  buttonProps?: BaseButtonProps
  buttonLabel?: string
  buttonIcon?: iconType
}

export const CustomFormModalOpenButton = (props: ICustomFormModalOpenButton) => {
  const { style, buttonProps, buttonLabel, ...CustomFormModalProps } = props
  const [showModal, setShowModal] = useState(false)
  let ButtonType: JSX.Element

  if (props.buttonIcon) {
    ButtonType = (
      <CreateEditRemoveIconButton iconType={props.buttonIcon} onClick={() => setShowModal && setShowModal(true)} />
    )
  } else {
    ButtonType = (
      <Button style={props.style} {...props.buttonProps} onClick={() => setShowModal && setShowModal(true)}>
        {props.buttonLabel}
      </Button>
    )
  }
  return (
    <>
      {ButtonType}
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
