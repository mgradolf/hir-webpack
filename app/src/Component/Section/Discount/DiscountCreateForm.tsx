import React, { useEffect, useState } from "react"
import { Card, Button, Select } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import {
  saveSectionDiscount,
  getSectionFinancials,
  getAvailableDiscountPrograms
} from "~/ApiServices/Service/SectionService"
import { eventBus, REFRESH_SECTION_DISCOUNT_PAGE } from "~/utils/EventBus"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import "~/Sass/global/index.scss"
import { FINANCIAL_BASIS_PER_ENROLLMENT_TYPE_ID } from "~/utils/Constants"

interface IDiscountCreateFormProps {
  sectionId: number
  formInstance: FormInstance
  handleCancel: () => void
  closeModal?: () => void
  setApiCallInProgress: (flag: boolean) => void
}

const layout = {
  labelCol: { span: 6 }
}

export default function CreateDiscountProgram(props: IDiscountCreateFormProps) {
  const actions = []
  const [dataAvailable, setDataAvailable] = useState<boolean>(false)
  const [discountProgramID, setDiscountProgramID] = useState(Number)
  const [sectionDiscountItems, setSectionDiscountItems] = useState<Array<any>>([])
  const [sectionFinancialID, setSectionFinancialID] = useState(Number)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  const onFormSubmission = async () => {
    await props.formInstance.validateFields()
    const params = props.formInstance.getFieldsValue()
    params["SectionID"] = props.sectionId

    if (discountProgramID !== undefined) {
      sectionDiscountItems.forEach((key) => {
        if (key.DiscountProgramID === discountProgramID) {
          params["DiscountProgramID"] = discountProgramID
          params["SectionFinancialID"] = sectionFinancialID
          params["DiscountTypeID"] = key.DiscountTypeID
          params["Description"] = key.Description

          const discountParams = key.DiscountServiceParams
          for (const paramKey in discountParams) {
            params[paramKey] = discountParams[paramKey]
          }
          return
        }
      })
    }

    console.log("Params: ", params)

    const serviceMethoToCall: (params: { [key: string]: any }) => Promise<IApiResponse> = saveSectionDiscount

    setErrorMessages([])
    props.setApiCallInProgress(true)
    const response = await serviceMethoToCall(params)
    console.log(response)
    props.setApiCallInProgress(false)

    if (response && response.success) {
      props.formInstance.resetFields()
      eventBus.publish(REFRESH_SECTION_DISCOUNT_PAGE)
      props.closeModal && props.closeModal()
    } else {
      console.log(response.error)
      setErrorMessages(response.error)
    }
  }

  const onChangeDiscount = (value: any) => {
    setDataAvailable(true)
    setDiscountProgramID(value)
  }

  actions.push(<Button onClick={props.closeModal}>Cancel</Button>)
  actions.push(
    <Button onClick={onFormSubmission} disabled={!dataAvailable}>
      Submit
    </Button>
  )

  useEffect(() => {
    ;(async () => {
      const response = await getAvailableDiscountPrograms(props.sectionId)
      if (response && response.success && response.data) {
        setSectionDiscountItems(response.data)
      }
    })()
    ;(async () => {
      const response = await getSectionFinancials({
        SectionID: props.sectionId,
        FinancialBasisTypeID: FINANCIAL_BASIS_PER_ENROLLMENT_TYPE_ID
      })
      if (response && response.success && response.data) {
        setSectionFinancialID(response.data[0].SectionFinancialID)
      }
    })()
  }, [props])

  return (
    <Card title={`Add Discount Program`} actions={actions}>
      <Form form={props.formInstance} style={{ height: "40vh", overflowY: "scroll", padding: "10px" }}>
        <OldFormError errorMessages={errorMessages} />

        <Form.Item label="Discount Program" {...layout}>
          <Select aria-label="Select Discount Program" onChange={onChangeDiscount}>
            {sectionDiscountItems.map((x) => {
              return (
                <Select.Option key={x.DiscountProgramID} value={x.DiscountProgramID}>
                  {x.ShortName}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
      </Form>
    </Card>
  )
}
