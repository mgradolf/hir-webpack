import React, { useState } from "react"
import { message } from "antd"
import { MetaDrivenFormModal } from "~/Component/Common/Modal/MetaDrivenFormModal/MetaDrivenFormModal"
import { IField } from "~/Component/Common/Form/common"
import { createRefRecord, removeRefRecord, updateRefRecord } from "~/ApiServices/Service/RefLookupService"
import { eventBus } from "~/utils/EventBus"
import { ButtonType } from "antd/lib/button"
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"
import { CreateEditRemoveIconButton } from "~/Component/Common/Form/Buttons/CreateEditRemoveIconButton"

export function AddRefButton(props: { LookUpName: string; formMeta: IField[]; refreshEventName: string }) {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <CreateEditRemoveIconButton
        toolTip={`Create ${props.LookUpName}`}
        iconType="create"
        onClick={() => setShowModal(true)}
      />
      {showModal && (
        <MetaDrivenFormModal
          title={`Add new entry on ${props.LookUpName}`}
          meta={props.formMeta}
          metaName={props.LookUpName}
          formSubmitApi={(Content) =>
            createRefRecord({
              LookUpName: props.LookUpName,
              Content
            }).then((x) => {
              if (x.success) eventBus.publish(props.refreshEventName)
              return x
            })
          }
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  )
}
export function UpdateRefButton(props: {
  type?: ButtonType
  LookUpName: string
  formMeta: IField[]
  reference: { [key: string]: any }
  refreshEventName: string
}) {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <CreateEditRemoveIconButton
        toolTip={`Edit ${props.LookUpName}`}
        iconType="edit"
        onClick={() => setShowModal(true)}
      />
      {showModal && (
        <MetaDrivenFormModal
          title={`Update existing entry on ${props.LookUpName}`}
          meta={props.formMeta}
          metaName={props.LookUpName}
          initialFormValue={props.reference}
          formSubmitApi={(Content) =>
            updateRefRecord({
              LookUpName: props.LookUpName,
              Content: { ...Content, ID: props.reference.ID }
            }).then((x) => {
              if (x.success) {
                message.success("Update Successful!")
                eventBus.publish(props.refreshEventName)
              }
              return x
            })
          }
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  )
}
export function RemoveRefButton(props: {
  type?: ButtonType
  LookUpName: string
  ID: number
  refreshEventName: string
}) {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const remove = () => {
    setLoading(true)
    return removeRefRecord({ LookUpName: props.LookUpName, ID: props.ID }).then((x) => {
      setLoading(false)
      if (x.success) {
        setDisabled(true)
        eventBus.publish(props.refreshEventName)
      }
      return x
    })
  }
  return (
    <>
      {disabled && (
        <CreateEditRemoveIconButton
          toolTip={`Delete ${props.LookUpName}`}
          iconType="remove"
          inProgress={loading}
          onClick={() => showDeleteConfirm(remove)}
        />
      )}
    </>
  )
}
