import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { Button, Col, Row, Typography } from "antd"
import { BaseButtonProps } from "antd/lib/button/button"
import React, { CSSProperties, useState } from "react"
import { IField } from "~/Component/Common/Form/common"
import { MetaDrivenFormModal } from "~/Component/Common/Modal/MetaDrivenFormModal/MetaDrivenFormModal"
import { IconButton, iconType } from "~/Component/Common/Form/Buttons/IconButton"
import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"

interface IMetaDrivenFormModalOpenButton {
  buttonLabel: string
  iconType?: iconType
  buttonProps?: BaseButtonProps
  style?: CSSProperties
  formTitle: React.ReactNode
  formMeta: IField[]
  formMetaName?: string
  isHorizontal?: boolean
  formSubmitApi: (Params: { [key: string]: any }) => Promise<IApiResponse>
  initialFormValue?: { [key: string]: any }
  defaultFormValue?: { [key: string]: any }
  refreshEventName?: string
  helpkey?: string
}
export const MetaDrivenFormModalOpenButton = (props: IMetaDrivenFormModalOpenButton) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {props.iconType ? (
        <IconButton iconType={props.iconType} onClick={() => setShowModal(true)} toolTip={props.buttonLabel} />
      ) : (
        <Button
          type="primary"
          {...props.buttonProps}
          style={props.style}
          onClick={() => setShowModal(true)}
          children={props.buttonLabel}
        />
      )}
      {showModal && (
        <MetaDrivenFormModal
          title={
            <Row>
              <Col xs={24} sm={12}>
                <Typography.Title level={3}>{props.formTitle}</Typography.Title>
              </Col>
              <Col xs={24} sm={12}>
                <Row justify="end" gutter={[8, 8]}>
                  <Col>
                    <HelpButton helpKey={props.helpkey} />
                  </Col>
                </Row>
              </Col>
            </Row>
          }
          isHorizontal={props.isHorizontal}
          meta={props.formMeta}
          metaName={props.formMetaName}
          formSubmitApi={props.formSubmitApi}
          initialFormValue={props.initialFormValue}
          defaultFormValue={props.defaultFormValue}
          refreshEventAfterFormSubmission={props.refreshEventName}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  )
}
