import { searchCreditMemo } from "~/ApiServices/BizApi/payment/paymentIF"
import { renderDate, renderDetailsLink, renderLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getOrderCreditsTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "",
      dataIndex: "CreditMemoID",
      render: (text: any, record: any) => (isModal ? text : renderDetailsLink(`/order/${record.OrderID}`))
    },
    {
      title: "Credit Date",
      dataIndex: "CreditMemoDate",
      render: renderDate
    },
    {
      title: "Credit ID",
      dataIndex: "CreditMemoID",
      render: (text: any, record: any) => (isModal ? text : renderLink(`/order/${record.OrderID}`, text))
    },
    {
      title: "Item",
      dataIndex: "ItemName"
    },
    {
      title: "Charge Name",
      dataIndex: "FinancialDescription"
    },
    {
      title: "Credit Reason",
      dataIndex: "CreditReason"
    },
    {
      title: "Discount Program",
      dataIndex: "DiscountProgramName",
      render: (text: any, record: any) =>
        isModal ? text : renderLink(`/discount-program/${record.DiscountProgramID}`, text)
    },
    {
      title: "Charged Amount",
      dataIndex: "ChargeAmount"
    },
    {
      title: "Credit Amount",
      dataIndex: "CreditAmount"
    },
    {
      title: "Refund",
      dataIndex: "RefundAmount"
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchCreditMemo }
}
