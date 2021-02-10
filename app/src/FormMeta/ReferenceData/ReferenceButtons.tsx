import React, { useEffect, useState } from "react"
import { Button } from "antd"
import { FormModal } from "~/Component/Common/Form/FormModal"
import { ReferenceList } from "~/FormMeta/ReferenceData/ReferenceList"
import { IField } from "~/Component/Common/Form/common"
import { createRefRecord, removeRefRecord, updateRefRecord } from "~/ApiServices/Service/RefLookupService"
import { eventBus } from "~/utils/EventBus"

export function AddRefButton(props: { LookUpName: string; refreshEventName: string }) {
  const [showModal, setShowModal] = useState(false)
  const [formMeta, setFormMeta] = useState<IField[]>([])
  useEffect(() => {
    const __reference = ReferenceList.find((x) => x.Value === props.LookUpName)
    if (__reference) {
      if (__reference?.custom) {
        import(`~/FormMeta/ReferenceData/ReferenceCustomFormMeta/${props.LookUpName}`).then((x) => {
          setFormMeta(x.FormMeta)
        })
      } else {
        import("~/FormMeta/ReferenceData/ReferenceGeneric/ReferenceGenericFormMeta").then((x) => {
          setFormMeta(x.FormMeta)
        })
      }
    }

    // eslint-disable-next-line
  }, [])
  return (
    <>
      <Button type="primary" onClick={() => setShowModal(true)}>
        + Add
      </Button>
      {showModal && (
        <FormModal
          title={`Add new entry on ${props.LookUpName}`}
          meta={formMeta}
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
  reference: { [key: string]: any }
  refreshEventName: string
}) {
  const [showModal, setShowModal] = useState(false)
  const [formMeta, setFormMeta] = useState<IField[]>([])
  useEffect(() => {
    const __reference = ReferenceList.find((x) => x.Value === props.LookUpName)
    if (__reference) {
      if (__reference?.custom) {
        import(`~/FormMeta/ReferenceData/ReferenceCustomFormMeta/${props.LookUpName}`).then((x) => {
          setFormMeta(x.FormMeta)
        })
      } else {
        import("~/FormMeta/ReferenceData/ReferenceGeneric/ReferenceGenericFormMeta").then((x) => {
          setFormMeta(x.FormMeta)
        })
      }
    }
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <Button type="ghost" onClick={() => setShowModal(true)}>
        Update
      </Button>
      {showModal && (
        <FormModal
          title={`Update existing entry on ${props.LookUpName}`}
          meta={formMeta}
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