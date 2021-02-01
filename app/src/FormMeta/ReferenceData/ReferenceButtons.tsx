import React, { useEffect, useState } from "react"
import { Button } from "antd"
import { FormModal } from "~/Component/Common/Form/FormModal"
import { ReferenceList } from "~/FormMeta/ReferenceData/ReferenceList"
import { IField } from "~/Component/Common/Form/common"
import { createRefRecord, removeRefRecord, updateRefRecord } from "~/ApiServices/Service/RefLookupService"
// import { eventBus } from "~/utils/EventBus"

export function AddRefButton(props: { LookUpName: string }) {
  const [showModal, setShowModal] = useState(false)
  const [formMeta, setFormMeta] = useState<IField[]>([])
  useEffect(() => {
    const __reference = ReferenceList.find((x) => x.Value === props.LookUpName)
    if (__reference) {
      if (!__reference?.custom) {
        import("~/FormMeta/ReferenceData/ReferenceGeneric/ReferenceGenericFormMeta").then((x) => {
          setFormMeta(x.ReferenceGenericFormMeta)
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
            })
          }
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  )
}
export function UpdateRefButton(props: { LookUpName: string; reference: { [key: string]: any } }) {
  const [showModal, setShowModal] = useState(false)
  const [formMeta, setFormMeta] = useState<IField[]>([])
  useEffect(() => {
    const __reference = ReferenceList.find((x) => x.Value === props.LookUpName)
    console.log("__reference update ", __reference)
    if (__reference) {
      if (!__reference?.custom) {
        import("~/FormMeta/ReferenceData/ReferenceGeneric/ReferenceGenericFormMeta").then((x) => {
          setFormMeta(x.ReferenceGenericFormMeta)
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
          initialFilter={props.reference}
          formSubmitApi={(Content) =>
            updateRefRecord({
              LookUpName: props.LookUpName,
              Content: { ...Content, ID: props.reference.ID }
            })
          }
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  )
}
export function RemoveRefButton(props: { LookUpName: string; ID: number }) {
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
          }
        })
      }}
    >
      Remove
    </Button>
  )
}
