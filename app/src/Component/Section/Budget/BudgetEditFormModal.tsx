import * as React from "react"
import Modal from "~/Component/Common/Modal"
import { useEffect, useState } from "react"
import BudgetEditForm from "~/Component/Section/Budget/BudgetEditForm"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showUpdateBudgetModal } from "~/Store/ModalState"
import { getSectionFinancialById } from "~/ApiServices/Service/EntityService"
import { Form } from "antd"
import { IBudgetFieldNames } from "~/Component/Section/Interfaces"

interface IBudgetEditProps {
  sectionFinancialId: number
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
  SeatGroupIDs: "SeatGroupIDs"
}

function BudgetUpdate({ sectionFinancialId, closeUpdateBudgetModal, seatGroups, sectionId }: IBudgetEditProps) {
  const [formInstance] = Form.useForm()
  const [budgetLoading, setBudgetLoading] = useState(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>({ ItemUnitAmount: 0 })

  const handleCancel = () => {
    if (closeUpdateBudgetModal) {
      closeUpdateBudgetModal()
    }
  }

  useEffect(() => {
    if (sectionFinancialId) {
      ; (async () => {
        setBudgetLoading(true)
        const response = await getSectionFinancialById(sectionFinancialId)
        if (response && response.success) {
          formInstance.setFieldsValue(response.data)
        } else {
          if (closeUpdateBudgetModal) {
            closeUpdateBudgetModal()
          }
        }
        setBudgetLoading(false)
      })()
    }
  }, [sectionFinancialId, closeUpdateBudgetModal, formInstance, sectionId])

  console.log("Form: ", formInstance)

  return (
    <Modal
      showModal={true}
      width="800px"
      loading={budgetLoading}
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          <BudgetEditForm
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
