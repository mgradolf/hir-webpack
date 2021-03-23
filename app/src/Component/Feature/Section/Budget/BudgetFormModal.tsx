import * as React from "react"
import { Form } from "antd"
import Modal from "~/Component/Common/Modal/index2"
import { useState } from "react"
import CreateForm1 from "~/Component/Feature/Section/Budget/Form1"
import CreateForm2 from "~/Component/Feature/Section/Budget/Form2"
import { IBudgetFieldNames } from "~/Component/Feature/Section/Interfaces"

const filedNames: IBudgetFieldNames = {
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

interface ICreateNewBudgetProps {
  sectionId: number
  closeModal?: () => void
}

export default function CreateNewBudget(props: ICreateNewBudgetProps) {
  const [formInstance] = Form.useForm()
  const [selectedBudgetType, setSelectedBudgetType] = useState(String)
  const [firstFormVisible, setFirstFormVisible] = useState(true)
  const [secondFormVisible, setSecondFormVisible] = useState(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)

  const handleCancel = () => {
    if (props.closeModal) {
      props.closeModal()
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
      width="800px"
      loading={!(firstFormVisible || secondFormVisible)}
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          {firstFormVisible && <CreateForm1 handleCancel={handleCancel} handleSelected={onBudgetTypeSelected} />}
          {secondFormVisible && (
            <CreateForm2
              sectionId={props.sectionId}
              budgetType={selectedBudgetType}
              fieldNames={filedNames}
              formInstance={formInstance}
              closeModal={props.closeModal}
              goBackToFirstForm={goBackToBudgetTypeForm}
              setApiCallInProgress={setApiCallInProgress}
            />
          )}
        </>
      }
    />
  )
}
