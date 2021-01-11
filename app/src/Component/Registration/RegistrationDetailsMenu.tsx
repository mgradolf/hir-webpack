import React, { useState } from "react"
import { Button, Dropdown, Menu } from "antd"
import Notification from "~/utils/notification"
import { sendRegistrationConfirmationEmail } from "~/ApiServices/Service/MailService"
import { REGISTRATION_EMAIL_CONFIRMATION_SUCCESS } from "~/utils/Constants"
import RegistrationUpdateFormModal from "~/Component/Registration/RegistrationUpdateFormModal"
import RegistrationActionFormModal from "~/Component/Registration/RegistrationActionFormModal"

interface IRegistrationDetailsMenuProp {
  dataLoaded: { [key: string]: any }
}

export default function RegistrationDetailsMenu(props: IRegistrationDetailsMenuProp) {
  const [loading, setLoading] = useState<boolean>(false)
  const [showRegistrationDetails, setShowRegistrationDetails] = useState<boolean>(false)
  const [showRegistrationActions, setShowRegistrationActions] = useState<boolean>(false)

  const sendEmailConfirmation = async (StudentID: number, SeatGroupID: number) => {
    if (props.dataLoaded) {
      setLoading(true)
      const response = await sendRegistrationConfirmationEmail({
        StudentID: StudentID,
        SeatGroupID: SeatGroupID
      })
      if (response.success) {
        Notification(REGISTRATION_EMAIL_CONFIRMATION_SUCCESS)
        console.log("Successfully send email!")
      }
      setLoading(false)
    }
  }

  const getMenu = (dataInfo: { [key: string]: any }) => {
    return (
      <Menu>
        <Menu.Item>
          <Button type="link" onClick={() => setShowRegistrationDetails(true)}>
            Edit
          </Button>
          {showRegistrationDetails && (
            <RegistrationUpdateFormModal
              initialFormValue={dataInfo}
              closeModal={() => setShowRegistrationDetails(false)}
            />
          )}
        </Menu.Item>
        <Menu.Item>
          <Button type="link" onClick={() => setShowRegistrationActions(true)}>
            Drop/Withdraw/Delete
          </Button>
          {showRegistrationActions && (
            <RegistrationActionFormModal
              initialFormValue={dataInfo}
              closeModal={() => setShowRegistrationActions(false)}
            />
          )}
        </Menu.Item>
        <Menu.Item>
          <Button
            type="link"
            loading={loading}
            onClick={() => sendEmailConfirmation(dataInfo.StudentID, dataInfo.SeatGroupID)}
          >
            Email Confirmation
          </Button>
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <Dropdown.Button overlay={getMenu(props.dataLoaded)} type="primary">
      Updates
    </Dropdown.Button>
  )
}
