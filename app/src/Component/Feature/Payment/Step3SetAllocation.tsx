import { FormInstance } from "antd/lib/form"
import React from "react"
import { FormNumberInput } from "~/Component/Common/Form/FormNumberInput"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import { getOrderItemTableColumns } from "~/TableSearchMeta/OrderItem/OrderItemsTableColumns"

export const Step3SetAllocation = (props: { formInstance: FormInstance }) => {
  return (
    <>
      <FormNumberInput label="Total Balance" fieldName="TotalBalance" formInstance={props.formInstance} />
      <FormNumberInput label="Amount To Pay" fieldName="AmountToPay" formInstance={props.formInstance} />
      <ResponsiveTable {...getOrderItemTableColumns()} />
    </>
  )
}
