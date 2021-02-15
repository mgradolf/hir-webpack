import React, { useState } from "react"
import { Button, Menu } from "antd"
import { eventBus } from "~/utils/EventBus"
import { FormModal } from "~/Component/Common/Form/FormModal"
import { PersonDegreeFormMeta } from "~/Component/Person/FormMeta/PersonDegreeFormMeta"
import { removePersonEducationHistory, updatePersonEducationHistory } from "~/ApiServices/Service/PersonService"

interface IPersonEduMenu {
  PersonID: number
  initialData: { [key: string]: any }
}

export default function PersonEduMenu(props: IPersonEduMenu) {
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  return (
    <Menu>
      <Menu.Item key="0">
        <Button
          type="link"
          onClick={() => {
            setShowUpdateModal(true)
          }}
        >
          Edit
        </Button>
        {showUpdateModal && (
          <FormModal
            meta={PersonDegreeFormMeta}
            title={"Update Degree"}
            initialFormValue={props.initialData}
            defaultFormValue={{
              PersonID: props.initialData.PersonID,
              EducationHistID: props.initialData.EducationHistID
            }}
            formSubmitApi={updatePersonEducationHistory}
            refreshEventAfterFormSubmission={"REFRESH_EDUCATION_HISTORY_TAB"}
            closeModal={() => setShowUpdateModal(false)}
          />
        )}
      </Menu.Item>
      <Menu.Item key="1">
        <Button
          type="link"
          onClick={async () => {
            const response = await removePersonEducationHistory({ EducationHistID: props.initialData.EducationHistID })
            if (response && response.success) {
              eventBus.publish("REFRESH_EDUCATION_HISTORY_TAB")
            }
          }}
        >
          Remove
        </Button>
      </Menu.Item>
    </Menu>
  )
}
