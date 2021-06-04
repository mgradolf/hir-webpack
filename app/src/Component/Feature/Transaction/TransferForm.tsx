import React, { useEffect, useState } from "react"
import { Col, Divider, Form, message, Row, Table } from "antd"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { FormInstance } from "antd/lib/form"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { getTransactionTypes, transfer } from "~/ApiServices/Service/TransactionService"
import { FormNumberInput } from "~/Component/Common/Form/FormNumberInput"
import { TRANSFER_SUCCESSFULLY, TRANSFER_TRANSACTION_TYPE_ID } from "~/utils/Constants"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"
import { getDepositList } from "~/ApiServices/BizApi/cashaccount.AccountIF/cashaccount.AccountIF"
import { renderDate } from "~/Component/Common/ResponsiveTable"
import "~/Sass/utils.scss"

interface IFormFields {
  PersonID: string
  AccountTransactionTypeID: string
  Amount: string
  TransferDescription: string
  ReferenceNo: string
  TransactionID: string
  FromPersonBalance: string
  ToPersonBalance: string
}

const fieldNames: IFormFields = {
  PersonID: "PersonID",
  AccountTransactionTypeID: "AccountTransactionTypeID",
  Amount: "Amount",
  TransferDescription: "TransferDescription",
  ReferenceNo: "ReferenceNo",
  TransactionID: "TransactionID",
  ToPersonBalance: "ToPersonBalance",
  FromPersonBalance: "FromPersonBalance"
}

interface ITransferFormProps {
  formInstance: FormInstance
}

function TransferForm(props: ITransferFormProps) {
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
      props.formInstance.setFieldsValue({
        TransactionID: selectedRows[0].TransactionID,
        Amount: selectedRows[0].RemainingAmount
      })
    }
  }

  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={12}>
          <Divider orientation="left">Transfer From Person</Divider>
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
                  props.formInstance.setFieldsValue({ FromPersonBalance: remBalance })
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
            fieldName={fieldNames.FromPersonBalance}
            disabled
          />
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Divider orientation="left">Transfer To Person</Divider>
          <PersonLookup
            labelColSpan={8}
            wrapperColSpan={14}
            fieldName={fieldNames.PersonID}
            formInstance={props.formInstance}
            label={"Person"}
            onSelectedItems={(items: any) => {
              const personID = items[0].PersonID
              setLoading(true)
              getDepositList({ PersonID: personID }).then((x: any) => {
                if (x.success) {
                  setLoading(false)
                  let remBalance = 0.0
                  x.data.map((y: any) => {
                    if (y.RemainingAmount !== null) {
                      remBalance += y.RemainingAmount
                    }
                    return remBalance
                  })
                  props.formInstance.setFieldsValue({ ToPersonBalance: remBalance })
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
            fieldName={fieldNames.ToPersonBalance}
            disabled
          />
        </Col>
      </Row>

      <Divider orientation="left">Transaction Details</Divider>
      <FormDropDown
        labelColSpan={8}
        wrapperColSpan={14}
        formInstance={props.formInstance}
        label={"Transfer Type"}
        ariaLabel={"Transfer Type"}
        fieldName={fieldNames.AccountTransactionTypeID}
        refLookupService={() => getTransactionTypes({ BaseTransactionTypeID: TRANSFER_TRANSACTION_TYPE_ID })}
        displayKey="Name"
        valueKey="ID"
        rules={[{ required: true, message: "Please select transfer type!" }]}
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
        fieldName={fieldNames.TransferDescription}
      />

      <FormInput
        label={"TransactionID"}
        fieldName={fieldNames.TransactionID}
        formInstance={props.formInstance}
        hidden
      />

      <Divider orientation="left">Deposits</Divider>
      {depositList.length > 0 && (
        <Table
          loading={loading}
          rowKey="TransactionID"
          bordered
          rowSelection={rowSelection}
          dataSource={depositList}
          pagination={false}
          columns={columns}
        />
      )}
    </>
  )
}

export function TransferFormModalOpenButton() {
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
        transfer(Params).then((x) => {
          setApiCallInProgress(false)
          if (x.success) {
            message.success(TRANSFER_SUCCESSFULLY)
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
      formTitle={"Person Cash Account Transaction"}
      customForm={<TransferForm formInstance={formInstance} />}
      formInstance={formInstance}
      onFormSubmission={onFormSubmission}
      initialValues={initialValues}
      apiCallInProgress={apiCallInProgress}
      loading={loading}
      errorMessages={errorMessages}
      buttonLabel={"Transfer"}
      buttonProps={{ type: "link" }}
    />
  )
}
