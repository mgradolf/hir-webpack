import React, { useState } from "react"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { Form } from "antd"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { FormInstance } from "antd/lib/form"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"
import { addOrUpdateOfferingRequirement } from "~/ApiServices/Service/ProgramService"
import { eventBus } from "~/utils/EventBus"
import { ProgramOfferingRequirementsGroupDetails } from "~/Component/Feature/ProgramOfferingRequirementsGroup/ProgramOfferingRequirementsGroupDetails"
import { getOfferingGroupPolicyTypes } from "~/ApiServices/Service/RefLookupService"

interface IFieldNames {
  ProgramReqGroupID: any
  ProgramID: any
  Name: any
  PolicyTypeID: any
  PolicyValue: any
  CatalogNarrative: any
}

const FieldNames: IFieldNames = {
  ProgramReqGroupID: "ProgramReqGroupID",
  ProgramID: "ProgramID",
  Name: "Name",
  PolicyTypeID: "PolicyTypeID",
  PolicyValue: "PolicyValue",
  CatalogNarrative: "CatalogNarrative"
}

const ProgramOfferingRequirementsGroupButton = (props: {
  formInstance: FormInstance
  setLoading: (flag: boolean) => void
  OfferingGroup: { [key: string]: any }
}) => {
  const [allRequireSelected, setAllRequireSelected] = useState(true)
  return (
    <>
      <FormDropDown
        label="Policy Name"
        formInstance={props.formInstance}
        refLookupService={getOfferingGroupPolicyTypes}
        displayKey="Name"
        valueKey="ID"
        onChangeCallback={(value) => setAllRequireSelected(value === 1)}
        fieldName={FieldNames.PolicyTypeID}
        disabled={!allRequireSelected}
      />

      <FormInput
        label="Policy Value"
        fieldName={FieldNames.PolicyValue}
        formInstance={props.formInstance}
        disabled={allRequireSelected}
      />

      <FormInput label="Group Name" fieldName={FieldNames.Name} formInstance={props.formInstance} />

      <FormTextArea
        label="Catalog Narrative"
        formInstance={props.formInstance}
        fieldName={FieldNames.CatalogNarrative}
      />

      <ProgramOfferingRequirementsGroupDetails formInstance={props.formInstance} OfferingGroup={props.OfferingGroup} />
    </>
  )
}

export const ProgramOfferingRequirementsGroupFormOpenButton = (props: {
  OfferingGroup: { [key: string]: any }
  editMode: boolean
}) => {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessages, setErrorMessages] = useState<ISimplifiedApiErrorMessage[]>([])
  const onFormSubmission = async (closeModal: () => void) => {
    setApiCallInProgress(true)
    formInstance
      .validateFields()
      .then((fields: any) =>
        addOrUpdateOfferingRequirement({
          ...fields,
          ...props.OfferingGroup
        })
      )
      .then((x) => {
        if (x.success) {
          eventBus.publish("REFRESH_PROGRAM_OFFERING_REQUIREMENT")
          closeModal()
        } else setErrorMessages(x.error)
        setApiCallInProgress(false)
      })
      .catch(() => {
        setApiCallInProgress(false)
      })
  }
  return (
    <CustomFormModalOpenButton
      formTitle="Offering Group Setup"
      formInstance={formInstance}
      onFormSubmission={onFormSubmission}
      initialValues={props.OfferingGroup}
      apiCallInProgress={apiCallInProgress}
      loading={loading}
      customForm={
        <ProgramOfferingRequirementsGroupButton
          formInstance={formInstance}
          setLoading={setLoading}
          OfferingGroup={props.OfferingGroup}
        />
      }
      buttonLabel="Add Offering Group To Program"
      iconType={props.editMode ? "edit" : "create"}
      errorMessages={errorMessages}
    />
  )
}
