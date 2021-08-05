import * as React from "react"
import Modal from "~/Component/Common/Modal/index2"
import { useEffect, useState } from "react"
import BudgetEditForm from "~/Component/Feature/Section/Budget/BudgetEditForm"
import { getSectionFinancials } from "~/ApiServices/Service/SectionService"
import { Form } from "antd"
import { IBudgetFieldNames } from "~/Component/Feature/Section/Interfaces"

interface IBudgetEditProps {
  financialId: number
  seatGroups: Array<any>
  sectionId: number
  closeModal?: () => void
  helpKey?: string
}

const fieldNames: IBudgetFieldNames = {
  SectionID: "SectionID",
  FinancialID: "FinancialID",
  Description: "Description",
  GLAccountID: "GLAccountID",
  ItemUnitAmount: "ItemUnitAmount",
  ItemQty: "ItemQty",
  InitialDepositAmount: "InitialDepositAmount",
  IsOptional: "IsOptional",
  SeatGroupIDs: "SeatGroupIDs",
  FinancialBasisType: "FinancialBasisType",
  FinancialType: "FinancialType"
}

export function BudgetEditFormModal({ financialId, closeModal, seatGroups, sectionId, helpKey }: IBudgetEditProps) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>({})
  const [financialType, setFinancialType] = useState(String)

  const handleCancel = () => {
    if (closeModal) {
      closeModal()
    }
  }

  useEffect(() => {
    if (financialId) {
      ;(async () => {
        setApiCallInProgress(true)
        const response = await getSectionFinancials({ SectionID: sectionId, FinancialID: financialId })
        if (response && response.success) {
          formInstance.setFieldsValue(response.data[0])
          setFinancialType(response.data[0].FinancialType)
        } else {
          if (closeModal) {
            closeModal()
          }
        }
        setApiCallInProgress(false)
      })()
    }
  }, [financialId, closeModal, formInstance, sectionId])

  return (
    <Modal
      width="800px"
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          <BudgetEditForm
            financialType={financialType}
            sectionId={sectionId}
            selectedSeatGroups={seatGroups}
            handleCancel={handleCancel}
            setApiCallInProgress={setApiCallInProgress}
            initialFormValue={initialFormValue}
            fieldNames={fieldNames}
            formInstance={formInstance}
            helpKey={helpKey}
          />
        </>
      }
    />
  )
}
