import React, { useEffect, useState } from "react"
import { Button, Typography } from "antd"
import { findDueDatesByItemsSummary } from "~/ApiServices/BizApi/query/queryIf"
import { addOrderItemsToPay } from "~/ApiServices/Service/PaymentService"
import { getOrganizations } from "~/ApiServices/Service/RefLookupService"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"
import { CUSTOM_FIELD, DATE_PICKERS, DROPDOWN, IField, NUMBER, TEXT } from "~/Component/Common/Form/common"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"
import { ProgramLookup } from "~/Component/Common/Form/FormLookupFields/ProgramLookup"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"
import { StudentLookup } from "~/Component/Common/Form/FormLookupFields/StudentLookup"
import { LookupModal } from "~/Component/Common/Modal/LookupModal/LookupModal"
import { renderDate, renderLink, ResponsiveTable, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

const meta: IField[] = [
  {
    label: "Balance More Than",
    fieldName: "BalanceMoreThan",
    inputType: NUMBER
  },
  {
    label: "Purchaser",
    fieldName: "PersonID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: PersonLookup
  },
  {
    label: "Student",
    fieldName: "StudentID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: StudentLookup
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    fieldName: "OrganizationID",
    ariaLabel: "Department Select",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
  },
  {
    label: "Order ID",
    fieldName: "OrderID",
    inputType: TEXT
  },
  {
    label: "Payment Due Date",
    fieldName: "PaymentDueDateTo",
    fieldName2: "PaymentDueDateFrom",
    inputType: DATE_PICKERS
  },
  {
    label: "OrderDateTo",
    fieldName: "OrderDateTo",
    fieldName2: "OrderDateFrom",
    inputType: DATE_PICKERS
  },
  // {
  //   label: "DepartmentID",
  //   fieldName: "DepartmentID",
  //   inputType: TEXT
  // },
  {
    label: "OptionalItem",
    fieldName: "OptionalItem",
    inputType: TEXT
  },
  {
    label: "SectionID",
    fieldName: "SectionID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SectionLookup
  },
  {
    label: "ProgramID",
    fieldName: "ProgramID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: ProgramLookup
  }
]

const columns: TableColumnType = [
  { title: "Order ID", dataIndex: "OrderID", render: (text, record) => renderLink(`/order/${text}`, text) },
  { title: "Item", dataIndex: "ItemName" },
  { title: "Due Date", dataIndex: "PaymentDueDate", render: renderDate },
  { title: "Balance", dataIndex: "Balance" }
]
export const Step2SelectOrderItems = (props: {
  PersonID?: number
  setSelectedOrderItems: (Params: any[]) => void
  setAllocatedItems: (Params: any[]) => void
}) => {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedOrderItems, setSelectedOrderItems] = useState<any[]>([])

  const __addOrderItemsToPay = (___: any[]): Promise<IApiResponse> => {
    if (___.length > 0) {
      setLoading(true)
      return addOrderItemsToPay({ OrderItemIDs: ___.map((x) => x.OrderItemID) }).then((response) => {
        if (response.success && response.data && response.data.Allocation && Array.isArray(response.data.Allocation)) {
          props.setAllocatedItems(response.data.Allocation)
          const temp = ___.filter((x) => response.data.Allocation.find((a: any) => a.OrderItemID === x.OrderItemID))
          props.setSelectedOrderItems(temp)
          setSelectedOrderItems(temp)
          setLoading(false)
        }
        return response
      })
    }
    props.setAllocatedItems([])
    props.setSelectedOrderItems([])
    setSelectedOrderItems([])
    return Promise.resolve({ code: 200, success: true, error: false, data: "" })
  }

  useEffect(() => {
    if (props.PersonID) {
      findDueDatesByItemsSummary({ PersonID: props.PersonID }).then((x) => {
        if (x.success && Array.isArray(x.data) && x.data.length > 0) {
          setLoading(true)
          __addOrderItemsToPay(x.data)
        }
      })
    }
    // eslint-disable-next-line
  }, [props.PersonID])
  return (
    <>
      <ResponsiveTable
        loading={loading}
        columns={[
          ...columns,
          {
            title: "Action",
            render: (text, record) => (
              <IconButton
                iconType="remove"
                toolTip="Remove Item"
                onClickRemove={() => {
                  const __ = selectedOrderItems.filter((x) => x.OrderItemID !== record.OrderItemID)
                  return __addOrderItemsToPay(__)
                }}
              />
            )
          }
        ]}
        dataSource={selectedOrderItems}
      />
      <div
        style={{
          marginTop: "10px",
          marginBottom: "30px",
          display: "flex",
          flexFlow: "row",
          justifyContent: "space-between"
        }}
      >
        <Button onClick={() => setShowModal(true)}>Select Order Items</Button>
        {selectedOrderItems.length > 0 && (
          <Typography.Title level={4}>
            Total Balance: {selectedOrderItems.reduce((acc, curr) => acc + curr.Balance, 0)}
          </Typography.Title>
        )}
      </div>
      {showModal && (
        <LookupModal
          title="Select Order Items to Pay"
          meta={meta}
          metaName=""
          closeModal={(items?: any[]) => {
            setShowModal(false)
            if (items && items.length > 0) {
              __addOrderItemsToPay(items)
            }
          }}
          searchFunc={findDueDatesByItemsSummary}
          isArray={true}
          columns={columns}
          initialFormValue={{ PersonID: props.PersonID }}
        />
      )}
    </>
  )
}
