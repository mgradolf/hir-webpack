import * as React from "react"
import { Form } from "antd"
import Modal from "~/Component/Common/Modal"
import { useState } from "react"
import CreateForm1 from "~/Component/Section/Budget/Form1"
import CreateForm2 from "~/Component/Section/Budget/Form2"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showCreateBudgetModal } from "~/Store/ModalState"
import { redirect } from "~/Store/ConnectedRoute"
import { IBudgetFieldNames } from "~/Component/Section/Interfaces"

const filedNames: IBudgetFieldNames = {
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

interface ICreateNewBudgetProps {
  sectionId: number
  redirect?: (url: string) => void
  closeCreateBudgetModal?: () => void
}

function CreateNewBudget(props: ICreateNewBudgetProps) {
  const [formInstance] = Form.useForm()
  const [selectedBudgetType, setSelectedBudgetType] = useState(String)
  const [firstFormVisible, setFirstFormVisible] = useState(true)
  const [secondFormVisible, setSecondFormVisible] = useState(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)

  const handleCancel = () => {
    if (props.closeCreateBudgetModal) {
      props.closeCreateBudgetModal()
    }
    goBackToBudgetTypeForm()
  }

  const onBudgetTypeSelected = (selectedBudgetType: any) => {
    setSelectedBudgetType(selectedBudgetType)
    setFirstFormVisible(false)
    setSecondFormVisible(true)
  }

  const goBackToBudgetTypeForm = () => {
    setSecondFormVisible(false)
    setFirstFormVisible(true)
  }

  return (
    <Modal
      showModal={true}
      width="800px"
      loading={!(firstFormVisible || secondFormVisible)}
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          {firstFormVisible && (
            <CreateForm1
              handleCancel={handleCancel}
              handleSelected={onBudgetTypeSelected}
            />
          )}
          {secondFormVisible && (
            <CreateForm2
              sectionId={props.sectionId}
              budgetType={selectedBudgetType}
              fieldNames={filedNames}
              formInstance={formInstance}
              goBackToFirstForm={goBackToBudgetTypeForm}
              setApiCallInProgress={setApiCallInProgress}
            />
          )}
        </>
      }
    />
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeCreateBudgetModal: () => dispatch(showCreateBudgetModal(false)),
    redirect: (url: string) => dispatch(redirect(url))
  }
}

export default connect(undefined, mapDispatchToProps)(CreateNewBudget)
