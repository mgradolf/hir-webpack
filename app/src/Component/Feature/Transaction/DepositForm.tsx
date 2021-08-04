import React, { useEffect, useState } from "react"
import { Divider, Form, message } from "antd"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { FormInstance } from "antd/lib/form"
import { credit, getTransactionTypes } from "~/ApiServices/Service/TransactionService"
import { DEPOSIT_TRANSACTION_TYPE_ID, DEPOSIT_SUCCESSFULLY } from "~/utils/Constants"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormNumberInput } from "~/Component/Common/Form/FormNumberInput"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"
import { getDepositList } from "~/ApiServices/BizApi/cashaccount.AccountIF/cashaccount.AccountIF"

interface IFormFields {
  PersonID: string
  AccountTransactionTypeID: string
  Amount: string
  DepositDescription: string
  ReferenceNo: string
  Balance: string
}

const fieldNames: IFormFields = {
  PersonID: "PersonID",
  AccountTransactionTypeID: "AccountTransactionTypeID",
  Amount: "Amount",
  DepositDescription: "DepositDescription",
  ReferenceNo: "ReferenceNo",
  Balance: "Balance"
}

function DepositForm(props: { formInstance: FormInstance }) {
  return (
    <>
      <Divider orientation="left">Deposit To Cash Account</Divider>
      <PersonLookup
        labelColSpan={8}
        wrapperColSpan={14}
        fieldName={fieldNames.PersonID}
        formInstance={props.formInstance}
        label={"Person"}
        onSelectedItems={(items: any) => {
          const personID = items[0].PersonID
          getDepositList({ PersonID: personID }).then((x: any) => {
            if (x.success) {
              let remBalance = 0.0
              x.data.map((y: any) => {
                if (y.RemainingAmount !== null) {
                  remBalance += y.RemainingAmount
                }
                return remBalance
              })
              props.formInstance.setFieldsValue({ Balance: remBalance })
            }
          })
        }}
        rules={[{ required: true, message: "Please select person!" }]}
      />
      <FormInput
        labelColSpan={8}
        wrapperColSpan={14}
        label={"Balance"}
        ariaLabel={"Balance"}
        formInstance={props.formInstance}
        fieldName={fieldNames.Balance}
        disabled
      />

      <Divider orientation="left">Transaction Details</Divider>
      <FormDropDown
        labelColSpan={8}
        wrapperColSpan={14}
        formInstance={props.formInstance}
        label={"Deposit Type"}
        ariaLabel={"Deposit Type"}
        fieldName={fieldNames.AccountTransactionTypeID}
        refLookupService={() => getTransactionTypes({ BaseTransactionTypeID: DEPOSIT_TRANSACTION_TYPE_ID })}
        displayKey="Name"
        valueKey="ID"
        rules={[{ required: true, message: "Please select deposit type!" }]}
      />

      <FormInput
        labelColSpan={8}
        wrapperColSpan={14}
        label={"Reference No"}
        ariaLabel={"Reference No"}
        formInstance={props.formInstance}
        fieldName={fieldNames.ReferenceNo}
      />

      <FormNumberInput
        labelColSpan={8}
        wrapperColSpan={14}
        label={"Amount"}
        ariaLabel={"Amount"}
        formInstance={props.formInstance}
        fieldName={fieldNames.Amount}
        rules={[{ required: true, message: "Please enter amount!" }]}
      />

      <FormTextArea
        labelColSpan={8}
        wrapperColSpan={14}
        label={"Description"}
        ariaLabel={"Description"}
        formInstance={props.formInstance}
        fieldName={fieldNames.DepositDescription}
      />
    </>
  )
}

export function DepositFormModalOpenButton() {
  const [loading] = useState(false)
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [initialValues] = useState<{ [key: string]: any }>({})

  useEffect(() => {
    setErrorMessages([])
  }, [])

  const onFormSubmission = async (closeModal: () => void) => {
    setApiCallInProgress(true)
    formInstance
      .validateFields()
      .then((x) => {
        setErrorMessages([])
        const Params = formInstance.getFieldsValue()
        credit(Params).then((x) => {
          setApiCallInProgress(false)
          if (x.success) {
            message.success(DEPOSIT_SUCCESSFULLY)
            closeModal()
          } else setErrorMessages(x.error)
        })
      })
      .catch((error) => {
        console.log("error in transaction validation")
        setApiCallInProgress(false)
      })
  }

  return (
    <CustomFormModalOpenButton
      formTitle={"Cash Account Transaction"}
      customForm={<DepositForm formInstance={formInstance} />}
      formInstance={formInstance}
      onFormSubmission={onFormSubmission}
      initialValues={initialValues}
      apiCallInProgress={apiCallInProgress}
      helpKey="financialsTransactionsCreateDepositForm"
      loading={loading}
      errorMessages={errorMessages}
      buttonLabel={"Deposit"}
      buttonProps={{ type: "link" }}
    />
  )
}
