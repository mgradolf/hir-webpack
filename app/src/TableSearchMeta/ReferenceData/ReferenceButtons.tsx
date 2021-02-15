import React, { useState } from "react"
import { Button } from "antd"
import { FormModal } from "~/Component/Common/Form/FormModal"
import { IField } from "~/Component/Common/Form/common"
import { createRefRecord, removeRefRecord, updateRefRecord } from "~/ApiServices/Service/RefLookupService"
import { eventBus } from "~/utils/EventBus"

export function AddRefButton(props: { LookUpName: string; formMeta: IField[]; refreshEventName: string }) {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Button type="primary" onClick={() => setShowModal(true)}>
        + Add
      </Button>
      {showModal && (
        <FormModal
          title={`Add new entry on ${props.LookUpName}`}
          meta={props.formMeta}
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
  LookUpName: string
  formMeta: IField[]
  reference: { [key: string]: any }
  refreshEventName: string
}) {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Button type="ghost" onClick={() => setShowModal(true)}>
        Update
      </Button>
      {showModal && (
        <FormModal
          title={`Update existing entry on ${props.LookUpName}`}
          meta={props.formMeta}
          initialFormValue={props.reference}
          formSubmitApi={(Content) =>
            updateRefRecord({
              LookUpName: props.LookUpName,
              Content: { ...Content, ID: props.reference.ID }
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
export function RemoveRefButton(props: { LookUpName: string; ID: number; refreshEventName: string }) {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  return (
    <Button
      type="ghost"
      danger
      loading={loading}
      disabled={disabled}
      onClick={() => {
        setLoading(true)
        removeRefRecord({ LookUpName: props.LookUpName, ID: props.ID }).then((x) => {
          setLoading(false)
          if (x.success) {
            setDisabled(true)
            eventBus.publish(props.refreshEventName)
          }
        })
      }}
    >
      Remove
    </Button>
  )
}
