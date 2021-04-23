import React, { useState } from "react"
import { Form } from "antd"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { FormInstance } from "antd/lib/form"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"
import { saveOrUpdateProgramFinancial } from "~/ApiServices/Service/ProgramService"
import { eventBus } from "~/utils/EventBus"
import { getFinancialBasisType, getGLAccountTypes } from "~/ApiServices/Service/RefLookupService"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import { FormCheckbox } from "~/Component/Common/Form/FormCheckbox"
import { FormNumberInput } from "~/Component/Common/Form/FormNumberInput"

interface IFieldNames {
  ProgramID: any
  IsApplicationCharge: any
  Description: any
  FinancialBasisTypeID: any
  GLAccountID: any
  IsOptional: any
  ItemUnitAmount: any
  IsCharge: any
}

const FieldNames: IFieldNames = {
  ProgramID: "ProgramID",
  IsApplicationCharge: "IsApplicationCharge",
  Description: "Description",
  FinancialBasisTypeID: "FinancialBasisTypeID",
  GLAccountID: "GLAccountID",
  IsOptional: "IsOptional",
  ItemUnitAmount: "ItemUnitAmount",
  IsCharge: "IsCharge"
}

const ProgramOfferingRequirementsGroupButton = (props: {
  formInstance: FormInstance
  setLoading: (flag: boolean) => void
  ProgramFinancial: { [key: string]: any }
}) => {
  const [isApplicationSelected, setIsApplicationSelected] = useState(true)
  return (
    <>
      <FormMultipleRadio
        formInstance={props.formInstance}
        label="Applied To"
        fieldName={FieldNames.IsApplicationCharge}
        defaultValue={true}
        onChangeCallback={(value) => setIsApplicationSelected(value)}
        options={[
          { label: "Application", value: true },
          { label: "Enrollment", value: false }
        ]}
      />

      <FormTextArea formInstance={props.formInstance} label="Description" fieldName={FieldNames.Description} />
      <FormDropDown
        formInstance={props.formInstance}
        label="Basis"
        fieldName={FieldNames.FinancialBasisTypeID}
        refLookupService={getFinancialBasisType}
        displayKey="Name"
        valueKey="ID"
      />
      <FormCheckbox
        formInstance={props.formInstance}
        label="Is Optional"
        fieldName={FieldNames.IsOptional}
        disabled={isApplicationSelected}
      />
      <FormDropDown
        formInstance={props.formInstance}
        label="GL Account"
        fieldName={FieldNames.GLAccountID}
        refLookupService={getGLAccountTypes}
        displayKey="Name"
        valueKey="ID"
      />

      <FormNumberInput formInstance={props.formInstance} label="Amount" fieldName={FieldNames.ItemUnitAmount} />

      <FormMultipleRadio
        formInstance={props.formInstance}
        label="Financial Type"
        fieldName={FieldNames.IsCharge}
        defaultValue={true}
        options={[
          { label: "Expense", value: true },
          { label: "Income", value: false }
        ]}
      />
    </>
  )
}

export const ProgramFinancialFormOpenButton = (props: {
  ProgramFinancial: { [key: string]: any }
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
      .then((fields: any) => {
        if (!fields[FieldNames.IsOptional]) {
          fields[FieldNames.IsOptional] = false
        }
        return saveOrUpdateProgramFinancial({
          ...fields,
          ...props.ProgramFinancial
        })
      })
      .then((x) => {
        if (x.success) {
          eventBus.publish("REFRESH_PROGRAM_FINANCIAL")
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
      initialValues={props.ProgramFinancial}
      apiCallInProgress={apiCallInProgress}
      loading={loading}
      customForm={
        <ProgramOfferingRequirementsGroupButton
          formInstance={formInstance}
          setLoading={setLoading}
          ProgramFinancial={props.ProgramFinancial}
        />
      }
      buttonLabel="Add Offering Group To Program"
      iconType={props.editMode ? "edit" : "create"}
      errorMessages={errorMessages}
    />
  )
}
