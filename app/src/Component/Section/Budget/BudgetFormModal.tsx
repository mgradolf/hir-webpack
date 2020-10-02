import * as React from "react"
import Modal from "~/Component/Common/Modal"
import { useState } from "react"
import CreateForm1 from "~/Component/Section/Budget/Form1"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showCreateBudgetModal } from "~/Store/ModalState"
import { redirect } from "~/Store/ConnectedRoute"

interface ICreateNewBudgetProps {
  sectionId: number
  redirect?: (url: string) => void
  closeCreateBudgetModal?: () => void
}

function CreateNewBudget(props: ICreateNewBudgetProps) {
  const [editMode] = useState(false)
  // const [initialFormValue, setInitialFormValue] = useState<{ [key: string]: any }>({})
  // const [formInstance] = Form.useForm()
  const [firstFormVisible, setFirstFormVisible] = useState(true)
  const [secondFormVisible, setSecondFormVisible] = useState(false)
  const [apiCallInProgress] = useState(false)

  const handleCancel = () => {
    if (props.closeCreateBudgetModal) {
      props.closeCreateBudgetModal()
    }
    goBackToBudgetTypeForm()
  }

  const onBudgetTypeSelected = (selectedBudgetType: any) => {
    setFirstFormVisible(false)
    setSecondFormVisible(true)
  }

  const goBackToBudgetTypeForm = () => {
    // setInitialFormValue({})
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
          {firstFormVisible && !editMode && (
            <CreateForm1 handleCancel={handleCancel} handleSelected={onBudgetTypeSelected} />
          )}
          {/* {secondFormVisible && (
            <CreateForm2
              editMode={editMode}
              initialFormValue={initialFormValue}
              formInstance={formInstance}
              goBackToFirstForm={goBackToOfferingTypeForm}
              setApiCallInProgress={setApiCallInProgress}
            />
          )} */}
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
