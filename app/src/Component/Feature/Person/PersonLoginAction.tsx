import React, { useState } from "react"
import { Button, Dropdown, Menu, message, Row } from "antd"
import { INVITE_TO_SETUP_WEB_LOGIN, INVITE_TO_RESET_PASSWORD, UNLOCK_WEB_LOGIN } from "~/utils/Constants"
import { MetaDrivenFormModal } from "~/Component/Common/Modal/MetaDrivenFormModal/MetaDrivenFormModal"
import { PersonLoginFormMeta } from "~/Component/Feature/Person/FormMeta/PersonLoginFormMeta"
import {
  sendPasswordResetEmail,
  unlockPersonLogin,
  updateLoginInfo
} from "~/ApiServices/BizApi/NTSWebLogin/NTSWebLoginIF"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { setupWebLogin } from "~/ApiServices/Service/PersonService"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"

interface IPersonLoginActionProp {
  initialData: { [key: string]: any }
}

export function PersonLoginAction(props: IPersonLoginActionProp) {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const isLogin: boolean = props.initialData.UserLogin !== undefined
  const lockedUntil: boolean = props.initialData.LockedUntil !== undefined && props.initialData.LockedUntil !== null

  const inviteToSetupWebLogin = async (PersonID: number) => {
    setLoading(true)
    const response = await setupWebLogin({
      PersonID: PersonID
    })
    if (response.success) {
      message.success(INVITE_TO_SETUP_WEB_LOGIN)
      eventBus.publish(REFRESH_PAGE)
    }
    setLoading(false)
  }

  const inviteToResetPassword = async (PersonID: number) => {
    setLoading(true)
    const response = await sendPasswordResetEmail({
      PersonID: PersonID
    })
    if (response.success) {
      message.success(INVITE_TO_RESET_PASSWORD)
      eventBus.publish(REFRESH_PAGE)
    }
    setLoading(false)
  }

  const unlockWebLogin = async (PersonID: number) => {
    setLoading(true)
    const response = await unlockPersonLogin({
      PersonID: PersonID
    })
    if (response.success) {
      message.success(UNLOCK_WEB_LOGIN)
      eventBus.publish(REFRESH_PAGE)
    }
    setLoading(false)
  }

  const getMenu = (dataInfo: { [key: string]: any }) => {
    return (
      <Menu>
        <Menu.Item>
          <Button
            disabled={isLogin}
            type="link"
            loading={loading}
            onClick={() => inviteToSetupWebLogin(dataInfo.PersonID)}
          >
            Invite to setup web login
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button
            disabled={!isLogin || lockedUntil}
            type="link"
            loading={loading}
            onClick={() => inviteToResetPassword(dataInfo.PersonID)}
          >
            Invite to reset password
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button
            disabled={props.initialData !== null ? !props.initialData.LockedUntil : true}
            type="link"
            loading={loading}
            onClick={() => unlockWebLogin(dataInfo.PersonID)}
          >
            Unlock
          </Button>
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <Row>
      <IconButton disabled={!isLogin} toolTip="Edit Login Info" iconType="edit" onClick={() => setShowModal(true)} />
      {showModal && (
        <MetaDrivenFormModal
          meta={PersonLoginFormMeta}
          metaName="PersonLoginFormMeta"
          title={"Update Person Login Info"}
          initialFormValue={props.initialData}
          defaultFormValue={{ PersonID: props.initialData.PersonID }}
          formSubmitApi={updateLoginInfo}
          refreshEventAfterFormSubmission={REFRESH_PAGE}
          closeModal={() => setShowModal(false)}
        ></MetaDrivenFormModal>
      )}
      <Dropdown.Button style={{ marginLeft: "5px" }} overlay={getMenu(props.initialData)} type="primary">
        Actions
      </Dropdown.Button>
    </Row>
  )
}
