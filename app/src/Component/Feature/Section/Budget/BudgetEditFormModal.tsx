import * as React from "react"
import Modal from "~/Component/Common/Modal"
import { useEffect, useState } from "react"
import BudgetEditForm from "~/Component/Section/Budget/BudgetEditForm"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showUpdateBudgetModal } from "~/Store/ModalState"
import { getSectionFinancials } from "~/ApiServices/Service/SectionService"
import { Form } from "antd"
import { IBudgetFieldNames } from "~/Component/Section/Interfaces"

interface IBudgetEditProps {
  financialId: number
  seatGroups: Array<any>
  sectionId: number
  closeUpdateBudgetModal?: () => void
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

function BudgetUpdate({ financialId, closeUpdateBudgetModal, seatGroups, sectionId }: IBudgetEditProps) {
  const [formInstance] = Form.useForm()
  const [budgetLoading, setBudgetLoading] = useState(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>({})
  const [financialType, setFinancialType] = useState(String)

  const handleCancel = () => {
    if (closeUpdateBudgetModal) {
      closeUpdateBudgetModal()
    }
  }

  useEffect(() => {
    if (financialId) {
      ;(async () => {
        setBudgetLoading(true)
        const response = await getSectionFinancials({ SectionID: sectionId, FinancialID: financialId })
        if (response && response.success) {
          formInstance.setFieldsValue(response.data[0])
          setFinancialType(response.data[0].FinancialType)
        } else {
          if (closeUpdateBudgetModal) {
            closeUpdateBudgetModal()
          }
        }
        setBudgetLoading(false)
      })()
    }
  }, [financialId, closeUpdateBudgetModal, formInstance, sectionId])

  return (
    <Modal
      showModal={true}
      width="800px"
      loading={budgetLoading}
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
          />
        </>
      }
    />
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { closeUpdateBudgetModal: () => dispatch(showUpdateBudgetModal(false)) }
}

export default connect(undefined, mapDispatchToProps)(BudgetUpdate)
