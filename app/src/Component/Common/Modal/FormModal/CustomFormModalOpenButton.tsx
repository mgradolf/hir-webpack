import React, { CSSProperties } from "react"
import { Button } from "antd"
import { BaseButtonProps } from "antd/lib/button/button"
import { CustomFormModal, ICustomFormModal } from "~/Component/Common/Modal/FormModal/CustomFormModal"

export interface ICustomFormModalOpenButton extends Omit<ICustomFormModal, "closeModal"> {
  style?: CSSProperties
  buttonProps?: BaseButtonProps
  buttonLabel?: string
  showModal: boolean
  setShowModal: (show: boolean) => void
}
export const CustomFormModalOpenButton = (props: ICustomFormModalOpenButton) => {
  const { style, buttonProps, buttonLabel, showModal, setShowModal, ...CustomFormModalProps } = props
  return (
    <>
      <Button style={props.style} {...props.buttonProps} onClick={() => setShowModal && setShowModal(true)}>
        {props.buttonLabel}
      </Button>

      {props.showModal && <CustomFormModal {...CustomFormModalProps} closeModal={() => setShowModal(false)} />}
    </>
  )
}
