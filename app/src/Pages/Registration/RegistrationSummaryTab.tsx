import { Button } from "antd"
import React, { useState } from "react"
import Notification from "~/utils/notification"
import { sendRegistrationConfirmationEmail } from "~/ApiServices/Service/MailService"
import { REGISTRATION_EMAIL_CONFIRMATION_SUCCESS } from "~/utils/Constants"
import { StandardDetailsPage } from "~/Component/Common/Page/DetailsPage/StandardDetailsPage"
import { getRegistrationDetailsMeta } from "~/FormMeta/Registration/RegistrationDetailsMeta"

interface IRegistrationSummaryTabProp {
  dataLoaded: { [key: string]: any }
}

export function RegistrationSummaryTab(props: IRegistrationSummaryTabProp) {
  const [loading, setLoading] = useState<boolean>(false)

  const sendEmailConfirmation = async () => {
    if (props.dataLoaded) {
      setLoading(true)
      const response = await sendRegistrationConfirmationEmail({
        StudentID: props.dataLoaded.StudentID,
        SeatGroupID: props.dataLoaded.SeatGroupID
      })
      if (response.success) {
        Notification(REGISTRATION_EMAIL_CONFIRMATION_SUCCESS)
        console.log("Successfully send email!")
      }
      setLoading(false)
    }
  }

  return (
    <StandardDetailsPage
      getDetailsMeta={getRegistrationDetailsMeta}
      dataLoaded={props.dataLoaded}
      cardActions={[
        <Button type="primary" loading={loading} onClick={sendEmailConfirmation}>
          Email Confirmation
        </Button>
      ]}
    />
  )
}
