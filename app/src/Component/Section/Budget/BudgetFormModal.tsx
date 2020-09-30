import * as React from "react"
import { Form } from "antd"
import Modal from "~/Component/Common/Modal"
import { useEffect, useState } from "react"
import CreateForm1 from "~/Component/Section/Budget/Form1"
import CreateForm2 from "~/Component/Offering/CreateEdit/Form2"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showCreateBudgetModal } from "~/Store/ModalState"
import { getOfferingById } from "~/ApiServices/Service/EntityService"
import { redirect } from "~/Store/ConnectedRoute"

interface ICreateNewBudgetProps {
  sectionId: number
  redirect?: (url: string) => void
  closeCreateBudgetModal?: () => void
}

function CreateNewBudget(props: ICreateNewBudgetProps) {
  const [editMode, setEditMode] = useState(false)
  const [initialFormValue, setInitialFormValue] = useState<{ [key: string]: any }>({})
  const [formInstance] = Form.useForm()
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
    setFirstFormVisible(false)
    setSecondFormVisible(true)
  }

  const goBackToBudgetTypeForm = () => {
    setInitialFormValue({})
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
            <CreateForm1
              handleCancel={handleCancel}
              handleSelected={onBudgetTypeSelected}
            />
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
