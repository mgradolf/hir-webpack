import React, { useEffect, useState } from "react"
import { Form, message } from "antd"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { EditOutlined } from "@ant-design/icons"
import { SECTION_TRMINATION_TIME, UPDATE_SUCCESSFULLY } from "~/utils/Constants"
import { getSectionDetails, getSectionStatistics, updateSection } from "~/ApiServices/Service/SectionService"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"

interface ISectionEditLinkProp {
  SectionID: number
  component: React.FunctionComponent<any>
  tooltip: string
  helpKey?: string
}

export function SectionEditLink(props: ISectionEditLinkProp) {
  const [loading, setLoading] = useState(false)
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [initialValues, setInitialValue] = useState<{ [key: string]: any }>({})

  useEffect(() => {
    const getSectionDetail = () => {
      setLoading(true)
      return Promise.all([
        getSectionDetails({ SectionID: props.SectionID }),
        getSectionStatistics({ SectionID: props.SectionID })
      ]).then((responses) => {
        const response1 = responses[0]
        const response2 = responses[1]
        if (response1.success && response2.success) {
          setLoading(false)
          response2.data = {
            ...response2.data,
            ...response1.data
          }
          const chooseStartDate: boolean = response2.data.StartTermID != null ? false : true
          const chooseEndDate: string =
            response2.data.EndTermID != null ? SECTION_TRMINATION_TIME.TERM : SECTION_TRMINATION_TIME.DATE
          setInitialValue({ ...response2.data, ChooseStartDate: chooseStartDate, ChooseEndDate: chooseEndDate })
          return response2
        } else if (response2.success) {
          const chooseStartDate: boolean = response2.data.StartTermID != null ? false : true
          const chooseEndDate: string =
            response2.data.EndTermID != null ? SECTION_TRMINATION_TIME.TERM : SECTION_TRMINATION_TIME.DATE
          setInitialValue({ ...response2.data, ChooseStartDate: chooseStartDate, ChooseEndDate: chooseEndDate })
          return response2
        } else {
          const chooseStartDate: boolean = response1.data.StartTermID != null ? false : true
          const chooseEndDate: string =
            response1.data.EndTermID != null ? SECTION_TRMINATION_TIME.TERM : SECTION_TRMINATION_TIME.DATE
          setInitialValue({ ...response1.data, ChooseStartDate: chooseStartDate, ChooseEndDate: chooseEndDate })
          return response1
        }
      })
    }
    getSectionDetail()
  }, [props.SectionID])

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
    <>
      {Object.keys(initialValues).length > 0 && (
        <CustomFormModalOpenButton
          formTitle={"Update Section"}
          helpKey={props.helpKey}
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
      )}
    </>
  )
}
