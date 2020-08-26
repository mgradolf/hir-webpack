import * as React from "react"
import { Form, Typography } from "antd"
import Modal from "~/component/Modal"
import { useEffect, useState } from "react"
import FinancialForm from "~/component/Offering/Financial/FinancialForm"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showCreateOfferingFinancialModal } from "~/store/ModalState"
import { createOfferingFinancial, updateOfferingFinancial } from "~/ApiServices/Service/OfferingService"
import { getOfferingFinancialById } from "~/ApiServices/Service/EntityService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import EventBus from "~/utils/EventBus"
import { REFRESH_OFFERING_FINANCIAL_PAGE } from "~/utils/EventList"

interface ICreateNewOfferingProps {
  offeringFinancialId?: number
  offeringID: number
  closeCreateOfferingModal?: () => void
}

function CreateNewOffering({ offeringFinancialId, closeCreateOfferingModal, offeringID }: ICreateNewOfferingProps) {
  const [initialFormValue, setInitialFormValue] = useState<{ [key: string]: any }>({})
  const [editOfferingEntity, setEditOfferingEntity] = useState<any | null>(null)
  const [formInstance] = Form.useForm()
  const [offeringFinancialLoading, setofferingFinancialLoading] = useState(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages] = useState<Array<string>>([])

  const handleCancel = () => {
    if (closeCreateOfferingModal) {
      closeCreateOfferingModal()
    }
    console.log("initialFormValue ", initialFormValue)
    console.log("editOfferingEntity ", editOfferingEntity)
  }

  const handleOk = async () => {
    console.log(formInstance.getFieldsValue())
    const validationPassed = await formInstance.validateFields()
    console.log("validationPassed ", validationPassed)
    const params = formInstance.getFieldsValue()

    const serviceMethoToCall: (params: { [key: string]: any }) => Promise<IApiResponse> = offeringFinancialId
      ? updateOfferingFinancial
      : createOfferingFinancial

    setApiCallInProgress(true)
    const response = await serviceMethoToCall(params)
    setApiCallInProgress(false)

    if (response && response.success) {
      formInstance.resetFields()
      console.log("REFRESH_OFFERING_FINANCIAL_PAGE")
      EventBus.publish(REFRESH_OFFERING_FINANCIAL_PAGE)
      handleCancel()
    } else {
      console.log(response)
    }
  }

  useEffect(() => {
    console.log("offeringFinancialId ", offeringFinancialId)

    if (offeringFinancialId) {
      ;(async () => {
        setofferingFinancialLoading(true)
        const response = await getOfferingFinancialById(offeringFinancialId)
        if (response && response.success) {
          setEditOfferingEntity(response.data)
          setInitialFormValue(response.data)
        } else {
          if (closeCreateOfferingModal) {
            closeCreateOfferingModal()
          }
        }
        setofferingFinancialLoading(false)
      })()
    }
  }, [offeringFinancialId, closeCreateOfferingModal])

  return (
    <Modal
      showModal={true}
      width="800px"
      loading={offeringFinancialLoading}
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          {errorMessages.length && (
            <ul>
              <li>
                {errorMessages.map((item) => {
                  return <Typography.Text type="danger">{item}</Typography.Text>
                })}
              </li>
            </ul>
          )}
          <FinancialForm
            offeringID={offeringID}
            initialFormValue={initialFormValue}
            formInstance={formInstance}
            handleCancel={handleCancel}
            onFormSubmission={handleOk}
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
