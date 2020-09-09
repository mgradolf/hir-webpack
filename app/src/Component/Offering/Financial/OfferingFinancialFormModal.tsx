import * as React from "react"
import Modal from "~/Component/Modal"
import { useEffect, useState } from "react"
import FinancialForm from "~/Component/Offering/Financial/FinancialForm"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showCreateOfferingFinancialModal } from "~/store/ModalState"
import { getOfferingFinancialById } from "~/ApiServices/Service/EntityService"
import { Form } from "antd"
import { IOfferingFinancialFieldNames } from "~/Component/Offering/Interfaces"

interface ICreateNewOfferingProps {
  offeringFinancialId?: number
  offeringID: number
  closeCreateOfferingModal?: () => void
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

function CreateNewOffering({ offeringFinancialId, closeCreateOfferingModal, offeringID }: ICreateNewOfferingProps) {
  const [formInstance] = Form.useForm()
  const [offeringFinancialLoading, setofferingFinancialLoading] = useState(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>({ ItemUnitAmount: 0 })

  const handleCancel = () => {
    if (closeCreateOfferingModal) {
      closeCreateOfferingModal()
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
          if (closeCreateOfferingModal) {
            closeCreateOfferingModal()
          }
        }
        setofferingFinancialLoading(false)
      })()
    }
  }, [offeringFinancialId, closeCreateOfferingModal, formInstance])

  return (
    <Modal
      showModal={true}
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

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { closeCreateOfferingModal: () => dispatch(showCreateOfferingFinancialModal(false)) }
}

export default connect(undefined, mapDispatchToProps)(CreateNewOffering)
