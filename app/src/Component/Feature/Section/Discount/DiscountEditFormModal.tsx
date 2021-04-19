import * as React from "react"
import Modal from "~/Component/Common/Modal/index2"
import { useEffect, useState } from "react"
import DiscountEditForm from "~/Component/Feature/Section/Discount/DiscountEditForm"
import { getSectionDiscounts } from "~/ApiServices/Service/SectionService"
import { Form } from "antd"
import { IDiscountFieldNames } from "~/Component/Feature/Section/Interfaces"

interface IDiscountEditProps {
  sectionDiscountId: number
  sectionId: number
  closeModal?: () => void
}

const fieldNames: IDiscountFieldNames = {
  SectionID: "SectionID",
  SectionFinancialID: "SectionFinancialID",
  DiscountProgramID: "DiscountProgramID",
  GLAccountID: "GLAccountID",
  DiscountTypeID: "DiscountTypeID",
  DiscountType: "DiscountType",
  DiscountVolume: "DiscountVolume",
  DiscountVolumeMultiply: "DiscountVolumeMultiply",
  IsActive: "IsActive",
  IsPromotedForMarketing: "IsPromotedForMarketing",
  Amount: "Amount",
  AmountTypeID: "AmountTypeID",
  ShortName: "ShortName",
  Name: "Name",
  ToAge: "ToAge",
  FromAge: "FromAge",
  ToDate: "ToDate",
  FromDate: "FromDate",
  promoCode: "promoCode"
}

export default function DiscountUpdate({ closeModal, sectionDiscountId, sectionId }: IDiscountEditProps) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>({ IsActive: true, IsPromotedForMarketing: true })

  const handleCancel = () => {
    if (closeModal) {
      closeModal()
    }
  }

  useEffect(() => {
    if (sectionDiscountId) {
      ;(async () => {
        setApiCallInProgress(true)
        const response = await getSectionDiscounts({ SectionID: sectionId, SectionDiscountID: sectionDiscountId })
        if (response && response.success && response.data) {
          formInstance.setFieldsValue(response.data[0])
          if (response.data[0].DiscountServiceParams !== undefined) {
            const discountServiceParams = response.data[0].DiscountServiceParams
            delete discountServiceParams["DiscountType"]
            formInstance.setFieldsValue(discountServiceParams)
          }
        } else {
          if (closeModal) {
            closeModal()
          }
        }
        setApiCallInProgress(false)
      })()
    }
    // eslint-disable-next-line
  }, [sectionDiscountId])

  return (
    <Modal
      width="800px"
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          <DiscountEditForm
            sectionId={sectionId}
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
