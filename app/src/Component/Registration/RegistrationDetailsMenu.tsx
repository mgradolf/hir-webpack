import React, { useState } from "react"
import { Menu, Button } from "antd"
import EmailFormModal from "~/Component/Registration/EmailFormModal"
import { sendRegistrationConfirmationEmail } from "~/ApiServices/Service/MailService"

interface IRegistrationDetailsMenu {
  additionalData: any
  setApiCallInProgress: (flag: boolean) => void
}

export default function RequestDetailsMenu(props: IRegistrationDetailsMenu) {
  const [showModal, setShowModal] = useState(false)

  return (
    <Menu>
      <Menu.Item key={0}>
        <Button
          type="link"
          onClick={async () => {
            props.setApiCallInProgress(true)
            const response = await sendRegistrationConfirmationEmail({
              StudentID: props.additionalData.StudentID,
              SeatGroupID: props.additionalData.SeatGroupID
            })
            if (response.success) {
              console.log("Successfully send email!")
            }
            props.setApiCallInProgress(false)
          }}
        >
          Send Email Registration Confirmation
        </Button>
      </Menu.Item>
      <Menu.Item key={1}>
        <Button type="link" onClick={() => setShowModal(true)}>
          Email Student
        </Button>
        {showModal && (
          <EmailFormModal toEmailAddress={props.additionalData.EmailAddress} closeModal={() => setShowModal(false)} />
        )}
      </Menu.Item>
    </Menu>
  )
}
