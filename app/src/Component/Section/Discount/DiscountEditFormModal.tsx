import * as React from "react"
import Modal from "~/Component/Common/Modal"
import { useEffect, useState } from "react"
import DiscountEditForm from "~/Component/Section/Discount/DiscountEditForm"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showUpdateDiscountModal } from "~/Store/ModalState"
import { getSectionDiscounts } from "~/ApiServices/Service/SectionService"
import { Form } from "antd"
import { IDiscountFieldNames } from "~/Component/Section/Interfaces"

interface IDiscountEditProps {
  sectionDiscountId: number
  sectionId: number
  closeUpdateDiscountModal?: () => void
}

const fieldNames: IDiscountFieldNames = {
  SectionID: "SectionID",
  SectionFinancialID: "SectionFinancialID",
  DiscountProgramID: "DiscountProgramID",
  GLAccountID: "GLAccountID",
  DiscountTypeID: "DiscountTypeID",
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

function DiscountUpdate({ closeUpdateDiscountModal, sectionDiscountId, sectionId }: IDiscountEditProps) {
  const [formInstance] = Form.useForm()
  const [discountLoading, setDiscountLoading] = useState(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>({ IsActive: true, IsPromotedForMarketing: true })

  const handleCancel = () => {
    if (closeUpdateDiscountModal) {
      closeUpdateDiscountModal()
    }
  }

  useEffect(() => {
    if (sectionDiscountId) {
      ;(async () => {
        setDiscountLoading(true)
        const response = await getSectionDiscounts({ SectionDiscountID: sectionDiscountId })
        if (response && response.success) {
          formInstance.setFieldsValue(response.data[0])
          if (response.data[0].DiscountServiceParams !== undefined) {
            formInstance.setFieldsValue(response.data[0].DiscountServiceParams)
          }
        } else {
          if (closeUpdateDiscountModal) {
            closeUpdateDiscountModal()
          }
        }
        setDiscountLoading(false)
      })()
    }
  }, [closeUpdateDiscountModal, formInstance, sectionDiscountId])

  return (
    <Modal
      showModal={true}
      width="800px"
      loading={discountLoading}
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

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { closeUpdateDiscountModal: () => dispatch(showUpdateDiscountModal(false)) }
}

export default connect(undefined, mapDispatchToProps)(DiscountUpdate)
