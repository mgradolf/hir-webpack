import React, { useState } from "react"
import { Button, Tooltip } from "antd"
import { eventBus } from "~/utils/EventBus"
import { removePersonEducationHistory } from "~/ApiServices/Service/PersonService"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"
import { PersonDegreeFormModal } from "~/Component/Feature/Person/Forms/PersonDegreeFormModal"

interface IPersonEduMenu {
  PersonID: number
  initialData: { [key: string]: any }
}

export default function PersonEduMenu(props: IPersonEduMenu) {
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  return (
    <>
      <Tooltip title="Edit">
        <Button
          type="primary"
          icon={<EditOutlined />}
          shape="circle"
          style={{ marginRight: "5px" }}
          onClick={() => {
            setShowUpdateModal(true)
          }}
        />
      </Tooltip>
      {showUpdateModal && (
        <PersonDegreeFormModal initialData={props.initialData} closeModal={() => setShowUpdateModal(false)} />
      )}
      <Tooltip title="Remove">
        <Button
          danger
          type="primary"
          icon={<DeleteOutlined />}
          shape="circle"
          onClick={() =>
            showDeleteConfirm(() => {
              return removePersonEducationHistory({ EducationHistID: props.initialData.EducationHistID }).then((x) => {
                if (x.success) {
                  eventBus.publish("REFRESH_EDUCATION_HISTORY_TAB")
                }
                return x
              })
            })
          }
        />
      </Tooltip>
    </>
  )
}
