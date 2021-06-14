import React, { useEffect, useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import PersonMergeForm from "~/Component/Feature/Person/Forms/CreateEdit/PersonMergeForm"
import { Button, Tooltip } from "antd"
import { MergeCellsOutlined } from "@ant-design/icons"
import { searchPersons } from "~/ApiServices/BizApi/person/personIF"

interface IPersonMergeFormModalProps {
  PersonInfo: { [key: string]: any }
  closeModal?: () => void
}

export default function PersonMergeFormModal(props: IPersonMergeFormModalProps) {
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>(props.PersonInfo || {})

  return (
    <Modal width="1000px" apiCallInProgress={apiCallInProgress}>
      <PersonMergeForm
        initialFormValue={initialFormValue}
        setApiCallInProgress={setApiCallInProgress}
        closeModal={props.closeModal}
      />
    </Modal>
  )
}

export const PersonMergeFormModalOpenButton = (props: { PersonID: number }) => {
  const [showModal, setShowModal] = useState(false)
  const [personInfo, setPersonInfo] = useState<{ [key: string]: any }>({})

  useEffect(() => {
    ;(async function () {
      const result = await searchPersons({ PersonID: props.PersonID })
      if (result.success && result.data) {
        setPersonInfo(result.data[0])
      }
    })()
  }, [props.PersonID])

  return (
    <>
      {setShowModal && (
        <Tooltip title="Merge Person">
          <Button
            type="primary"
            style={{ marginRight: "5px" }}
            shape="circle"
            onClick={() => setShowModal && setShowModal(true)}
            icon={<MergeCellsOutlined />}
          />
        </Tooltip>
      )}
      {showModal && Object.keys(personInfo).length > 0 && (
        <PersonMergeFormModal PersonInfo={personInfo} closeModal={() => setShowModal(false)} />
      )}
    </>
  )
}
