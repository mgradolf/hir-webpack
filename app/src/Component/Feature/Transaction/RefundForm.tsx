import React, { useEffect, useState } from "react"
import { Divider, Form, message, Table } from "antd"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { FormInstance } from "antd/lib/form"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { debit, getTransactionTypes } from "~/ApiServices/Service/TransactionService"
import { FormNumberInput } from "~/Component/Common/Form/FormNumberInput"
import { REFUND_SUCCESSFULLY, REFUND_TRANSACTION_TYPE_ID } from "~/utils/Constants"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"
import { getDepositList } from "~/ApiServices/BizApi/cashaccount.AccountIF/cashaccount.AccountIF"
import { renderDate } from "~/Component/Common/ResponsiveTable"
import "~/Sass/utils.scss"

interface IFormFields {
  AccountTransactionTypeID: string
  Amount: string
  RefundDescription: string
  ReferenceNo: string
  TransactionID: string
  Balance: string
}

const fieldNames: IFormFields = {
  AccountTransactionTypeID: "AccountTransactionTypeID",
  Amount: "Amount",
  RefundDescription: "RefundDescription",
  ReferenceNo: "ReferenceNo",
  TransactionID: "TransactionID",
  Balance: "Balance"
}

interface IRefundFormProps {
  formInstance: FormInstance
}

function RefundForm(props: IRefundFormProps) {
  const [loading, setLoading] = useState(false)
  const [depositList, setDepositList] = useState<Array<any>>([])

  const columns = [
    {
      title: "Deposit ID",
      dataIndex: "TransactionID"
    },
    {
      title: "Date",
      dataIndex: "TransactionDate",
      render: renderDate
    },
    {
      title: "Reference No",
      dataIndex: "ReferenceNo"
    },
    {
      title: "Deposit Amount",
      dataIndex: "Amount"
    },
    {
      title: "Balance",
      dataIndex: "RemainingAmount"
    }
  ]

  const rowSelection: any = {
    type: "radio",
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log("Selected Row: ", selectedRows)
      props.formInstance.setFieldsValue({
        TransactionID: selectedRows[0].TransactionID,
        Amount: selectedRows[0].RemainingAmount
      })
    }
  }

  return (
    <>
      <Divider orientation="left">Withdraw From Cash Account</Divider>
      <PersonLookup
        labelColSpan={8}
        wrapperColSpan={14}
        fieldName=""
        formInstance={props.formInstance}
        label={"Person"}
        onSelectedItems={(items: any) => {
          const personID = items[0].PersonID
          setLoading(true)
          getDepositList({ PersonID: personID }).then((x: any) => {
            if (x.success) {
              setLoading(false)
              setDepositList(x.data)
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

      {depositList.length > 0 && (
        <>
          <Divider orientation="left">Deposits</Divider>
          <Table
            loading={loading}
            rowKey="TransactionID"
            bordered
            rowSelection={rowSelection}
            dataSource={depositList}
            pagination={false}
            columns={columns}
          />
        </>
      )}

      <Divider orientation="left">Transaction Details</Divider>
      <FormDropDown
        labelColSpan={8}
        wrapperColSpan={14}
        formInstance={props.formInstance}
        label={"Refund Type"}
        ariaLabel={"Refund Type"}
        fieldName={fieldNames.AccountTransactionTypeID}
        refLookupService={() => getTransactionTypes({ BaseTransactionTypeID: REFUND_TRANSACTION_TYPE_ID })}
        displayKey="Name"
        valueKey="ID"
        rules={[{ required: true, message: "Please select refund type!" }]}
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
        fieldName={fieldNames.RefundDescription}
      />

      <FormInput
        label={"TransactionID"}
        fieldName={fieldNames.TransactionID}
        formInstance={props.formInstance}
        hidden
      />
    </>
  )
}

export function RefundFormModalOpenButton() {
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
        debit(Params).then((x) => {
          setApiCallInProgress(false)
          if (x.success) {
            message.success(REFUND_SUCCESSFULLY)
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
      customForm={<RefundForm formInstance={formInstance} />}
      formInstance={formInstance}
      onFormSubmission={onFormSubmission}
      initialValues={initialValues}
      apiCallInProgress={apiCallInProgress}
      loading={loading}
      errorMessages={errorMessages}
      buttonLabel={"Refund"}
      buttonProps={{ type: "link" }}
    />
  )
}
