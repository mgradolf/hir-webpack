import React, { CSSProperties, useState } from "react"
import { Button } from "antd"
import { BaseButtonProps } from "antd/lib/button/button"
import { CustomFormModal, ICustomFormModal } from "~/Component/Common/Modal/FormModal/CustomFormModal"
import { IconButton, iconType } from "~/Component/Common/Form/Buttons/IconButton"

export interface ICustomFormModalOpenButton extends Omit<ICustomFormModal, "closeModal"> {
  style?: CSSProperties
  buttonLabel: string
  buttonProps?: BaseButtonProps
  iconType?: iconType
  extraButtons?: JSX.Element[]
  disabled?: boolean
}

export const CustomFormModalOpenButton = (props: ICustomFormModalOpenButton) => {
  const { style, buttonProps, buttonLabel, ...CustomFormModalProps } = props
  const [showModal, setShowModal] = useState(false)
  let ButtonType: JSX.Element

  if (props.iconType) {
    ButtonType = (
      <IconButton
        toolTip={props.buttonLabel}
        iconType={props.iconType}
        disabled={props.disabled}
        onClick={() => setShowModal && setShowModal(true)}
      />
    )
  } else {
    ButtonType = (
      <Button
        style={props.style}
        disabled={props.disabled}
        {...props.buttonProps}
        onClick={() => setShowModal && setShowModal(true)}
      >
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
