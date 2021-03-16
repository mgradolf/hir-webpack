import React, { useEffect, useState } from "react"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { Col, Form, Row } from "antd"
import { FormInstance } from "antd/lib/form"
import { getRefList } from "~/ApiServices/Service/RefLookupService"
import { FormDatePicker } from "~/Component/Common/Form/FormDatePicker"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import { FormNumberInput } from "~/Component/Common/Form/FormNumberInput"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { RemoveRefButton } from "~/TableSearchMeta/ReferenceData/ReferenceButtons"
import { PAYMENT_POLICY_TYPE } from "~/utils/Constants"
import { savePaymentDueDatePolicy, getPaymentDueDatePolicy } from "~/ApiServices/Service/PaymentService"
import { eventBus } from "~/utils/EventBus"

// const getPaymentDueDatePolicy = (params: any): Promise<IApiResponse> =>
//   Promise.resolve({ code: 200, success: true, data: {}, error: "" })

// const savePaymentDueDatePolicy = (params: any): Promise<IApiResponse> =>
//   Promise.resolve({ code: 200, success: true, data: {}, error: "" })

interface IPolicyType {
  startEndDate: boolean
  orderDate: boolean
  fixedDate: boolean
}
const DueDatePolicyFormOpen = (props: { initialValues: { [key: string]: any }; formInstance: FormInstance }) => {
  const [selectedPolicyType, setSelectedPolicyType] = useState<IPolicyType>({
    startEndDate: false,
    orderDate: false,
    fixedDate: false
  })

  const policyTypeChanged = (value: any) => {
    const __policyType: IPolicyType = { startEndDate: false, orderDate: false, fixedDate: false }
    switch (value) {
      case 1:
      case 2:
        __policyType.startEndDate = true
        break
      case 3:
        __policyType.orderDate = true
        break
      case 4:
        __policyType.fixedDate = true
        break
    }
    setSelectedPolicyType(__policyType)
  }
  useEffect(() => {
    if (props.initialValues && props.initialValues.DateReferenceType)
      policyTypeChanged(props.initialValues.DateReferenceType)
  }, [props.initialValues])
  return (
    <Row>
      <div className="hidden">
        <FormInput formInstance={props.formInstance} label="ID" fieldName="ID" />
      </div>
      <Col xs={24} sm={24} md={12}>
        <FormInput formInstance={props.formInstance} label="Name" fieldName="Name" />
      </Col>
      <Col xs={24} sm={24} md={12}>
        <FormTextArea formInstance={props.formInstance} label="Description" fieldName="Description" />
      </Col>
      <Col xs={24} sm={24} md={12}>
        <FormMultipleRadio
          formInstance={props.formInstance}
          label="Is Active"
          fieldName="IsActive"
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
        />
      </Col>
      <Col xs={24} sm={24} md={12}>
        <FormNumberInput formInstance={props.formInstance} label="Sort Position" fieldName="SortPosition" />
      </Col>

      <Col xs={24} sm={24} md={12}>
        <FormDropDown
          onChangeCallback={(value: any) => policyTypeChanged(value)}
          formInstance={props.formInstance}
          label="Policy Type"
          fieldName="DateReferenceType"
          options={[
            { label: "Class Start Date", value: 1 },
            { label: "Class End Date", value: 2 },
            { label: "Order Date", value: 3 },
            { label: "Fixed Date", value: 4 }
          ]}
        />
      </Col>
      {(selectedPolicyType.startEndDate || selectedPolicyType.orderDate) && (
        <>
          <Col xs={24} sm={24} md={12}>
            <FormInput
              label={selectedPolicyType.orderDate ? "Offset (Days After)" : "Offset"}
              fieldName="NumberOfDays"
              formInstance={props.formInstance}
            />
          </Col>
        </>
      )}
      {selectedPolicyType.startEndDate && (
        <Col xs={24} sm={24} md={12}>
          <FormMultipleRadio
            label=""
            fieldName="BeforeAndAfter"
            {...(props.initialValues &&
              props.initialValues.IsBefore && { defaultValue: !props.initialValues.IsBefore })}
            options={[
              { label: "Days Before", value: false },
              { label: "Days After", value: true }
            ]}
            formInstance={props.formInstance}
          />
        </Col>
      )}
      {selectedPolicyType.fixedDate && (
        <Col xs={24} sm={24} md={12}>
          <FormDatePicker
            label="Date"
            fieldName="FixedDueDate"
            formInstance={props.formInstance}
            {...(props.initialValues &&
              props.initialValues.FixedDueDate && { defaultValue: props.initialValues.FixedDueDate })}
          />
        </Col>
      )}
    </Row>
  )
}
const DueDatePolicyFormOpenButton = (props: { ID?: number; refreshEventName: string }) => {
  const [formInstance] = Form.useForm()
  const [showModal, setShowModal] = useState(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [initialValues, setInitialValues] = useState<{ [key: string]: any }>({})

  useEffect(() => {
    if (props.ID && showModal) {
      setLoading(true)
      getPaymentDueDatePolicy({ PolicyID: props.ID })
        .then((x) => {
          if (x.success) setInitialValues({ ...x.data, BeforeAndAfter: !x.data.IsBefore })
        })
        .finally(() => setLoading(false))
    }
  }, [showModal, props.ID])

  const onFormSubmission = () => {
    formInstance.validateFields().then((x) => {
      const params = formInstance.getFieldsValue()
      setErrorMessages([])
      setApiCallInProgress(true)
      savePaymentDueDatePolicy(params)
        .then((response) => {
          setApiCallInProgress(false)
          if (response && response.success) {
            eventBus.publish(props.refreshEventName)
            setShowModal(false)
          } else {
            setErrorMessages(response.error)
          }
        })
        .catch((y) => console.error(y))
    })
  }

  return (
    <CustomFormModalOpenButton
      formTitle={props.ID ? "Update existing entry on DueDatePolicy" : "Add new entry on DueDatePolicy"}
      customForm={<DueDatePolicyFormOpen initialValues={initialValues} formInstance={formInstance} />}
      formInstance={formInstance}
      onFormSubmission={onFormSubmission}
      initialValues={initialValues}
      apiCallInProgress={apiCallInProgress}
      loading={loading}
      errorMessages={errorMessages}
      buttonLabel={props.ID ? "Update" : "+ Add"}
      buttonProps={{ type: props.ID ? "ghost" : "primary" }}
      showModal={showModal}
      setShowModal={(show: boolean) => setShowModal(show)}
    />
  )
}

export default function PaymentDueDatePolicy() {
  const refName = "DueDatePolicy"
  const refreshEventName = `REFRESH_${refName}`

  const columns: TableColumnType = [
    {
      title: "ID",
      dataIndex: "ID"
    },
    { title: "Policy Name", dataIndex: "Name" },
    {
      title: "Policy Type",
      dataIndex: "DateReferenceType",
      render: (text, record) => (typeof text === "number" && text > 0 && text < 5 ? PAYMENT_POLICY_TYPE[text] : text)
    },
    { title: "Policy Definition", dataIndex: "Description" },
    { title: "Sort Position", dataIndex: "SortPosition" },
    { title: "Is Active", dataIndex: "IsActive", render: renderBoolean },
    {
      title: "Actions",
      dataIndex: "ID",
      render: (ID: any, record: any) => (
        <>
          <DueDatePolicyFormOpenButton ID={ID} refreshEventName={refreshEventName} />
          <RemoveRefButton ID={ID} LookUpName={refName} refreshEventName={refreshEventName} />
        </>
      )
    }
  ]

  return (
    <SearchPage
      title={"Payment Due Date Policy"}
      tableProps={{ columns, refreshEventName, searchFunc: getRefList }}
      defaultFormValue={{ LookUpName: refName }}
      initialFormValue={{}}
      blocks={[<DueDatePolicyFormOpenButton refreshEventName={refreshEventName} />]}
    />
  )
}
