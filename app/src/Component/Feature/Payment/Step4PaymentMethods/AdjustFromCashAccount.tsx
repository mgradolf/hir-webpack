import React from "react"
import { Form, Typography } from "antd"
import { FormInstance } from "antd/lib/form"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import { getDepositList } from "~/ApiServices/BizApi/cashaccount.AccountIF/cashaccount.AccountIF"

export const AdjustFromCashAccount = (props: {
  formInstance: FormInstance
  PayerID?: number
  setDepositItems: (item: any[]) => void
}) => {
  return (
    <Form form={props.formInstance}>
      <FormInput wrapperColSpan={18} formInstance={props.formInstance} fieldName="" label="Payment Amount" disabled />
      <FormInput wrapperColSpan={18} formInstance={props.formInstance} fieldName="" label="Total Balance" disabled />
      <Typography.Title level={4}>Deposits</Typography.Title>
      <ResponsiveTable
        style={{ marginBottom: "30px" }}
        searchFunc={(Params: { [key: string]: any }) => {
          return getDepositList(Params).then((x) => {
            if (x.success) props.setDepositItems(x.data)
            return x
          })
        }}
        searchParams={{ PersonID: props.PayerID }}
        rowSelection={{
          type: "radio",
          onChange: (selectedRowKeys: any, selectedRows: any) => {
            props.setDepositItems(selectedRows)
          }
        }}
        columns={[
          { title: "Deposite ID", dataIndex: "TransactionID" },
          { title: "Date", dataIndex: "TransactionDate" },
          { title: "Reference No", dataIndex: "ReferenceNo" },
          { title: "Deposite Amount", dataIndex: "RemainingAmount" },
          { title: "Balance", dataIndex: "Amount" }
        ]}
      />
      <FormTextArea wrapperColSpan={18} formInstance={props.formInstance} fieldName="PaymentNotes" label="Notes" />
    </Form>
  )
}
