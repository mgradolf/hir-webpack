import * as React from "react"
import Modal from "~/Component/Common/Modal/index2"
import { useEffect, useState } from "react"
import FinancialForm from "~/Component/Feature/Financial/FinancialForm"
import { getOfferingFinancialById } from "~/ApiServices/Service/EntityService"
import { Form } from "antd"
import { IFinancialFieldNames } from "~/Component/Feature/Financial/Interfaces"
import {
  FINANCIAL_BASIS_TYPE_PER_UNIT_ID,
  FINANCIAL_TYPE_FACULTY,
  FINANCIAL_TYPE_MARKETING_PROGRAM
} from "~/utils/Constants"

interface ICreateNewFinancialProps {
  financialID?: number
  financialType: string
  applyToID: number
  helpkey?: string
  closeModal?: () => void
}

const fieldNames: IFinancialFieldNames = {
  IsCharge: "IsCharge",
  FinancialBasisTypeID: "FinancialBasisTypeID",
  Description: "Description",
  ItemUnitAmount: "ItemUnitAmount",
  GLAccountID: "GLAccountID",
  IsActive: "IsActive",
  FinancialTypeID: "FinancialTypeID",
  oca: "oca",
  Weight: "Weight",
  FinancialID: "FinancialID",
  IsOptional: "IsOptional",
  FinancialCategoryTypeID: "FinancialCategoryTypeID",
  ApplyToID: "ApplyToID",
  IsTaxable: "IsTaxable"
}

export default function CreateNewFinancial({
  financialID,
  closeModal,
  applyToID,
  financialType
}: ICreateNewFinancialProps) {
  const initialParam: { [key: string]: any } = {
    ItemUnitAmount: 0,
    IsActive: true,
    IsOptional: false,
    IsTaxable: false,
    IsCharge: true
  }

  if (financialType === FINANCIAL_TYPE_MARKETING_PROGRAM || financialType === FINANCIAL_TYPE_FACULTY) {
    initialParam["IsCharge"] = false
  }
  if (financialType === FINANCIAL_TYPE_FACULTY) {
    initialParam["FinancialBasisTypeID"] = FINANCIAL_BASIS_TYPE_PER_UNIT_ID
  }

  const [formInstance] = Form.useForm()
  const [offeringFinancialLoading, setofferingFinancialLoading] = useState(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>(initialParam)

  const [helpKey, setHelpKey] = useState("")

  useEffect(() => {
    if (financialType === "Offering") setHelpKey("sectionBudgetEditOfferingFinancialsForm")
    else if (financialType === "Instructor") setHelpKey("sectionBudgetEditInstructorFinancialsForm")
    else if (financialType === "MarketinghProgram") setHelpKey("sectionBudgetEditMarketinghProgramFinancialsForm")
    else if (financialType === "Resource") setHelpKey("sectionBudgetEditResourceFinancialsForm")
  }, [financialType])

  const handleCancel = () => {
    if (closeModal) {
      closeModal()
    }
  }

  useEffect(() => {
    if (financialID) {
      ;(async () => {
        setofferingFinancialLoading(true)
        const response = await getOfferingFinancialById(financialID)
        if (response && response.success) {
          formInstance.setFieldsValue(response.data)
        } else {
          if (closeModal) {
            closeModal()
          }
        }
        setofferingFinancialLoading(false)
      })()
    }
  }, [financialID, closeModal, formInstance])

  return (
    <Modal
      width="1000px"
      loading={offeringFinancialLoading}
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          <FinancialForm
            helpkey={helpKey}
            applyToID={applyToID}
            financialType={financialType}
            financialID={financialID}
            handleCancel={handleCancel}
            setApiCallInProgress={setApiCallInProgress}
            initialFormValue={initialFormValue}
            fieldNames={fieldNames}
            formInstance={formInstance}
          />
        </>
      }
    />
  )
}
