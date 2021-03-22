import React, { useState } from "react"
import { Button, Form } from "antd"
import Modal from "~/Component/Common/Modal/index2"
import { IBulkOrderFieldNames } from "~/Component/Account/Interfaces"
import BulkOrderForm from "~/Component/Package/Forms/BulkOrder/BulkOrderForm"

interface IBulkOrderFormModalProps {
  initialData: { [key: string]: any }
  closeModal?: () => void
}

const fieldNames: IBulkOrderFieldNames = {
  AccountID: "AccountID",
  Name: "Name",
  SectionID: "SectionID",
  IsDefaultAllocation: "IsDefaultAllocation",
  NumberOfSeats: "NumberOfSeats",
  InvitationCode: "InvitationCode",
  AffiliateFinancials: "AffiliateFinancials",
  StudentFinancials: "StudentFinancials",
  IsGenerateOrder: "IsGenerateOrder",
  PurchaserID: "PurchaserID",
  PONumber: "PONumber",
  POAmount: "POAmount",
  POName: "POName",
  PaymentDueDate: "PaymentDueDate"
}

export function BulkOrderFormModal(props: IBulkOrderFormModalProps) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>({
    ...props.initialData,
    IsEnableSeatAffiliate: true,
    IsEnableSeatStudent: false,
    IsDefaultAllocation: true,
    IsGenerateOrder: true
  })

  return (
    <Modal width="1000px" apiCallInProgress={apiCallInProgress}>
      <BulkOrderForm
        fieldNames={fieldNames}
        initialFormValue={initialFormValue}
        formInstance={formInstance}
        setApiCallInProgress={setApiCallInProgress}
        closeModal={props.closeModal}
      />
    </Modal>
  )
}

export const BulkOrderFormModalOpenButton = (props: { accountData: { [key: string]: any } }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {setShowModal && (
        <Button type="primary" onClick={() => setShowModal && setShowModal(true)}>
          Bulk Order
        </Button>
      )}
      {showModal && (
        <BulkOrderFormModal
          initialData={{ AccountID: props.accountData.AccountID }}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  )
}
