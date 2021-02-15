import React, { useState } from "react"
import { Button, Row } from "antd"
import Notification from "~/utils/notification"
import { FormModal } from "~/Component/Common/Form/FormModal2"
import { REFRESH_PAGE } from "~/utils/EventBus"
import { AccountFormMeta } from "~/FormMeta/Account/AccountFormMeta"
import { pushAccount } from "~/ApiServices/Service/AccountService"

interface IPersonAccountActionProp {
  initialData: { [key: string]: any }
}

export default function PersonAccountAction(props: IPersonAccountActionProp) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showLinkModal, setShowLinkModal] = useState(false)

  const isAccount: boolean = props.initialData !== null

  // const unlockWebLogin = async (PersonID: number) => {
  //   if (props.initialData) {
  //     setLoading(true)
  //     const response = await unlockPersonLogin({
  //       PersonID: PersonID
  //     })
  //     if (response.success) {
  //       Notification(UNLOCK_WEB_LOGIN)
  //       console.log("Successfully unlock person login done!")
  //     }
  //     setLoading(false)
  //   }
  // }

  return (
    <Row>
      {setShowAddModal && (
        <Button
          className={isAccount ? "hidden" : "show"}
          type="primary"
          style={{ marginRight: "10px" }}
          onClick={() => setShowAddModal && setShowAddModal(true)}
        >
          Add
        </Button>
      )}
      {showAddModal && (
        <FormModal
          meta={AccountFormMeta}
          isHorizontal={false}
          title={"Create New Account"}
          initialFormValue={props.initialData}
          defaultFormValue={{ AllowToPayLater: "Not Allowed" }}
          formSubmitApi={pushAccount}
          refreshEventAfterFormSubmission={REFRESH_PAGE}
          closeModal={() => setShowAddModal(false)}
        ></FormModal>
      )}
      {setShowLinkModal && (
        <Button
          className={isAccount ? "hidden" : "show"}
          type="ghost"
          style={{ marginRight: "10px" }}
          onClick={() => setShowLinkModal && setShowLinkModal(true)}
        >
          Link
        </Button>
      )}
      {showLinkModal && (
        <FormModal
          meta={AccountFormMeta}
          isHorizontal={false}
          title={"Create New Account"}
          initialFormValue={props.initialData}
          defaultFormValue={{ PersonID: props.initialData.PersonID }}
          formSubmitApi={pushAccount}
          refreshEventAfterFormSubmission={REFRESH_PAGE}
          closeModal={() => setShowAddModal(false)}
        ></FormModal>
      )}
    </Row>
  )
}
