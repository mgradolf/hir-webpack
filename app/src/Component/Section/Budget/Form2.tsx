import React, { useEffect, useState } from "react"
import { Card, Button, Input, Select, Switch } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { IBudgetFieldNames } from "~/Component/Section/Interfaces"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import {
  getAvailableOfferingFinancials,
  getAvailableFacultyWithFinancials,
  getAvailableResourcesWithFinancials,
  getAvailableMarketingProgramsWithFinancials,
  saveFinancials
} from "~/ApiServices/Service/SectionService"
import { eventBus } from "~/utils/EventBus"
import { getSeatGroups } from "~/ApiServices/Service/SeatGroupService"
import FormError from "~/Component/Common/OldForm/FormError"
import "~/Sass/global/index.scss"
import {
  BUDGET_FINANCIAL_TYPE_INSTRUCTOR,
  BUDGET_FINANCIAL_TYPE_MARKETING_PROGRAM,
  BUDGET_FINANCIAL_TYPE_OFFERING,
  BUDGET_FINANCIAL_TYPE_RESOURCE
} from "~/utils/Constants"
import { REFRESH_SECTION_BUDGET_PAGE } from "~/FormMeta/Section/SectionDetailsMeta"

interface IBudgetCreateForm2Props {
  sectionId: number
  budgetType: string
  formInstance: FormInstance
  fieldNames: IBudgetFieldNames
  closeModal?: () => void
  goBackToFirstForm: () => void
  setApiCallInProgress: (flag: boolean) => void
}

const layout = {
  labelCol: { span: 6 }
}

export default function CreateForm2(props: IBudgetCreateForm2Props) {
  const actions = []
  const [dataAvailable, setDataAvailable] = useState<boolean>(false)
  const [applySeatGroup, setApplySeatGroup] = useState<boolean>(false)
  const [seatGroupItems, setSeatGroupItems] = useState<Array<any>>([])
  const [availableFinancial, setAvailableFinancial] = useState<Array<any>>([])
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [financialIDs, setFinancialIDs] = useState<any[]>([])

  const onFormSubmission = async () => {
    await props.formInstance.validateFields()
    const params = props.formInstance.getFieldsValue()

    const seatGropuIDs: any[] = []
    if (applySeatGroup) {
      seatGroupItems.forEach((key) => {
        seatGropuIDs.push(key.SeatGroupID)
      })
    }

    const financialList: Array<any> = []
    financialIDs.forEach((financialID) => {
      const financialObj = {
        FinancialID: financialID,
        SeatGroupIDs: seatGropuIDs
      }
      financialList.push(financialObj)
    })
    params["SectionFinancials"] = financialList
    console.log("Params: ", params)

    const serviceMethoToCall: (params: { [key: string]: any }) => Promise<IApiResponse> = saveFinancials

    setErrorMessages([])
    props.setApiCallInProgress(true)
    const response = await serviceMethoToCall(params)
    console.log(response)
    props.setApiCallInProgress(false)

    if (response && response.success) {
      props.formInstance.resetFields()
      eventBus.publish(REFRESH_SECTION_BUDGET_PAGE)
      props.closeModal && props.closeModal()
    } else {
      console.log(response.error)
      setErrorMessages(response.error)
    }
  }

  const onChangeApplySeatGroups = (checked: boolean) => {
    setApplySeatGroup(checked)
  }

  const onChangeOffering = (value: any) => {
    setDataAvailable(true)
    const finacialIDArray: any[] = []
    finacialIDArray.push(value)
    setFinancialIDs(finacialIDArray)
  }

  const onChangeFaculty = (value: any) => {
    setDataAvailable(true)
    availableFinancial.forEach((key) => {
      if (key.FacultyID === value) {
        const financialItems: Array<any> = key.Financials
        const finacialIDArray: any[] = []
        financialItems.forEach((financial) => {
          finacialIDArray.push(financial.FinancialID)
        })
        setFinancialIDs(finacialIDArray)
      }
    })
  }

  const onChangeResource = (value: any) => {
    setDataAvailable(true)
    availableFinancial.forEach((key) => {
      if (key.ResourceID === value) {
        const financialItems: Array<any> = key.Financials
        const finacialIDArray: any[] = []
        financialItems.forEach((financial) => {
          finacialIDArray.push(financial.FinancialID)
        })
        setFinancialIDs(finacialIDArray)
      }
    })
  }

  const onChangeMarketingProgram = (value: any) => {
    setDataAvailable(true)
    availableFinancial.forEach((key) => {
      if (key.MarketingProgramID === value) {
        const financialItems: Array<any> = key.Financials
        const finacialIDArray: any[] = []
        financialItems.forEach((financial) => {
          finacialIDArray.push(financial.FinancialID)
        })
        setFinancialIDs(finacialIDArray)
      }
    })
  }

  actions.push(
    <Button
      onClick={() => {
        props.goBackToFirstForm()
      }}
    >
      Go Back
    </Button>
  )
  actions.push(<Button onClick={props.closeModal}>Cancel</Button>)
  actions.push(
    <Button onClick={onFormSubmission} disabled={!dataAvailable}>
      Submit
    </Button>
  )

  useEffect(() => {
    props.formInstance.setFieldsValue({
      [props.fieldNames.SectionID]: props.sectionId
    })
    ;(async () => {
      const response = await getSeatGroups({ SectionID: props.sectionId })
      if (response && response.success && response.data) {
        setSeatGroupItems(response.data)
      }
    })()
    if (props.budgetType === BUDGET_FINANCIAL_TYPE_OFFERING) {
      ;(async () => {
        const response = await getAvailableOfferingFinancials(props.sectionId)
        if (response && response.success && response.data) {
          setAvailableFinancial(response.data)
        }
      })()
    }
    if (props.budgetType === BUDGET_FINANCIAL_TYPE_INSTRUCTOR) {
      ;(async () => {
        const response = await getAvailableFacultyWithFinancials(props.sectionId)
        if (response && response.success && response.data) {
          setAvailableFinancial(response.data)
        }
      })()
    }
    if (props.budgetType === BUDGET_FINANCIAL_TYPE_RESOURCE) {
      ;(async () => {
        const response = await getAvailableResourcesWithFinancials(props.sectionId)
        if (response && response.success && response.data) {
          setAvailableFinancial(response.data)
        }
      })()
    }
    if (props.budgetType === BUDGET_FINANCIAL_TYPE_MARKETING_PROGRAM) {
      ;(async () => {
        const response = await getAvailableMarketingProgramsWithFinancials(props.sectionId)
        if (response && response.success && response.data) {
          setAvailableFinancial(response.data)
        }
      })()
    }
  }, [props])

  return (
    <Card title={`Create new ${props.budgetType} Financial`} actions={actions}>
      <Form form={props.formInstance} style={{ height: "40vh", overflowY: "scroll", padding: "10px" }}>
        <FormError errorMessages={errorMessages} />
        <Form.Item className="hidden" name={props.fieldNames.SectionID}>
          <Input aria-label="Section ID" />
        </Form.Item>

        {props.budgetType === BUDGET_FINANCIAL_TYPE_OFFERING && (
          <Form.Item label={props.budgetType} {...layout}>
            <Select aria-label={props.budgetType} onChange={onChangeOffering}>
              {availableFinancial.map((x) => {
                return (
                  <Select.Option key={x.FinancialID} value={x.FinancialID}>
                    {x.Description}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
        )}

        {props.budgetType === BUDGET_FINANCIAL_TYPE_INSTRUCTOR && (
          <Form.Item label={props.budgetType} {...layout}>
            <Select aria-label={props.budgetType} onChange={onChangeFaculty}>
              {availableFinancial.map((x) => {
                return (
                  <Select.Option key={x.FacultyID} value={x.FacultyID}>
                    {x.FormattedName}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
        )}

        {props.budgetType === BUDGET_FINANCIAL_TYPE_RESOURCE && (
          <Form.Item label={props.budgetType} {...layout}>
            <Select aria-label={props.budgetType} onChange={onChangeResource}>
              {availableFinancial.map((x) => {
                return (
                  <Select.Option key={x.ResourceID} value={x.ResourceID}>
                    {x.Resource}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
        )}

        {props.budgetType === BUDGET_FINANCIAL_TYPE_MARKETING_PROGRAM && (
          <Form.Item label={props.budgetType} {...layout}>
            <Select aria-label={props.budgetType} onChange={onChangeMarketingProgram}>
              {availableFinancial.map((x) => {
                return (
                  <Select.Option key={x.MarketingProgramID} value={x.MarketingProgramID}>
                    {x.MarketSource}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
        )}

        <Form.Item label="Apply to all seat groups" {...layout} valuePropName="checked">
          <Switch onChange={onChangeApplySeatGroups} aria-label="Apply to all seat groups" />
        </Form.Item>
      </Form>
    </Card>
  )
}
