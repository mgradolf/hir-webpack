import React, { useState } from "react"
import { Form, message } from "antd"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { EditOutlined } from "@ant-design/icons"
import { SECTION_TRMINATION_TIME, UPDATE_SUCCESSFULLY } from "~/utils/Constants"
import { updateSection } from "~/ApiServices/Service/SectionService"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"

interface ISectionEditLinkProp {
  initialValues: { [key: string]: any }
  component: React.FunctionComponent<any>
  tooltip: string
}

export function SectionEditLink(props: ISectionEditLinkProp) {
  const [loading, setLoading] = useState(false)
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [initialValues] = useState<{ [key: string]: any }>(props.initialValues || {})

  const chooseStartDate: boolean = props.initialValues.StartTermID != null ? false : true
  const chooseEndDate: string =
    props.initialValues.EndTermID != null ? SECTION_TRMINATION_TIME.TERM : SECTION_TRMINATION_TIME.DATE
  initialValues["ChooseStartDate"] = chooseStartDate
  initialValues["ChooseEndDate"] = chooseEndDate

  const onFormSubmission = async (closeModal: () => void) => {
    const params = formInstance.getFieldsValue(true)

    setLoading(true)
    setErrorMessages([])
    updateSection(params)
      .then((response) => {
        setApiCallInProgress(false)
        if (response && response.success) {
          formInstance.resetFields()
          message.success(UPDATE_SUCCESSFULLY)
          eventBus.publish(REFRESH_PAGE)
          closeModal()
        } else {
          setErrorMessages(response.error)
        }
      })
      .catch((y) => console.error(y))
  }

  return (
    <CustomFormModalOpenButton
      formTitle={"Update Section"}
      customForm={<props.component initialValue={initialValues} formInstance={formInstance} />}
      formInstance={formInstance}
      onFormSubmission={onFormSubmission}
      initialValues={initialValues}
      apiCallInProgress={apiCallInProgress}
      loading={loading}
      iconType="edit"
      buttonLabel={props.tooltip}
      errorMessages={errorMessages}
      buttonProps={{ type: "primary", shape: "circle", icon: <EditOutlined /> }}
    />
  )
}
