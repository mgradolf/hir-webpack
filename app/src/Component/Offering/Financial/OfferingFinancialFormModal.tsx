import * as React from "react"
import Modal from "~/Component/Common/Modal/index2"
import { useEffect, useState } from "react"
import FinancialForm from "~/Component/Offering/Financial/FinancialForm"
import { getOfferingFinancialById } from "~/ApiServices/Service/EntityService"
import { Form } from "antd"
import { IOfferingFinancialFieldNames } from "~/Component/Offering/Interfaces"

interface ICreateNewOfferingProps {
  offeringFinancialId?: number
  offeringID: number
  closeModal?: () => void
}

const fieldNames: IOfferingFinancialFieldNames = {
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

export default function CreateNewOfferingFinancial({
  offeringFinancialId,
  closeModal,
  offeringID
}: ICreateNewOfferingProps) {
  const [formInstance] = Form.useForm()
  const [offeringFinancialLoading, setofferingFinancialLoading] = useState(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>({ ItemUnitAmount: 0 })

  const handleCancel = () => {
    if (closeModal) {
      closeModal()
    }
  }

  useEffect(() => {
    if (offeringFinancialId) {
      ;(async () => {
        setofferingFinancialLoading(true)
        const response = await getOfferingFinancialById(offeringFinancialId)
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
  }, [offeringFinancialId, closeModal, formInstance])

  return (
    <Modal
      width="800px"
      loading={offeringFinancialLoading}
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          <FinancialForm
            offeringID={offeringID}
            financialID={offeringFinancialId}
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
